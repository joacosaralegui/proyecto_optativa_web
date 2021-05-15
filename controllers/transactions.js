/*
    Controller de los transactions 
*/

// Conexión a mongoose
var mongoose = require('mongoose')

// Connectarse a mongo con mongoose
const dbName = 'transactions';
const user = 'joaco';
const pass = "joaco1996";
const url = 'mongodb://'+user+':'+pass+'@localhost:27017/' + dbName;
const connection = mongoose.createConnection(url);

// Crear o traer la coleccion Transactions
var transactionSchema = require('../schemas/transactions')
var Transactions = connection.model('Transactions', transactionSchema);

// End points
module.exports.transactionsList = function(req, res){
    Transactions.find({}, function(err, result){
        if (err) {
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    });
}

// TODO: Agregar las funciones para update create y delete