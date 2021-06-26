// App de angular
angular.module('app', [])
.controller('myController', function($scope, $http){
	//Levanta los datos cuando se refresca la pagina
	var refresh = function(){
		$http.get('/transactions')
		.then(function(response) {
			console.log("hola, todo ok", response);
			$scope.transactions = response.data;
			$scope.transaction = ({});
		}, function errorCallback(response) {
			console.log("hola, todo mal!!", response);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
	// Traigo los datos
	refresh();

	// Orden inicial
	$scope.propertyName = 'sender.name';
	$scope.reverse = true;

	// Funcion de ordenamiento
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	// Cargar una transaccion nueva
	$scope.addTransaction = function () {
		console.log($scope.transaction);
		// Sacar el _id del objeto para crear uno nuevo
		if ("_id" in $scope.transaction)
			delete $scope.transaction._id;

		$http.post('/transactions',$scope.transaction)
		.then(function(response) {
			console.log("Ok ADD", response);
			refresh();
		}, function errorCallback(response) {
			console.log("Bad ADD", response);
		});
	}

	// Eliminar una transaccion
	$scope.remove = function(id){
		console.log("Remove: ", id);
		$http.delete('/transactions/' + id)
		.then(function(response) {
			console.log("Ok delete", response);
			refresh();
		}, function errorCallback(response) {
			console.log("BAD delete!!", response);
		});
	}

	// Trae una transaccion para editarla
	$scope.edit = function(id){
		console.log("Edit: ", id);
		$http.get('/transactions/' + id)
		.then(function(response) {
			$scope.transaction = response.data;
			console.log("OK Edit RD: ", response.data);
		}, function errorCallback(response) {
			console.log("Bad edit!!", response);
		});
	}
	
	// Edita y actualiza la transaccion
	$scope.update = function(){
		console.log("UPDATE: ", $scope.transaction);
		$http.put('/transactions/' + $scope.transaction._id, $scope.transaction)
		.then(function(response) {
			refresh();
			console.log("OK Update", response);
		}, function errorCallback(response) {
			refresh();
			console.log("BAD Update!!", response);
		});
	}

	// Vacia la transaccion seleccionada
	$scope.deselect = function(){
		$scope.transaction = ({});
	}
});
