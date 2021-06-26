/*
    Controller de los transactions 
*/

// Conexión a mongoose
var mongoose = require('mongoose')

// Connectarse a mongo con mongoose
// EN PRODUCCION GUARDAR EN UN ARCHIVO OCULTO O EN VARIABLES DE ENTORNO
const dbName = 'transactions';
const user = 'joaco';
const pass = "joaco1996";
const url = 'mongodb://'+user+':'+pass+'@127.0.0.1:27017/' + dbName;
const connection = mongoose.createConnection(url);

// Crear o traer la coleccion Transactions
var transactionSchema = require('../schemas/transactions')
var Transactions = connection.model('Transactions', transactionSchema);

// End points
// Creaer y guardar nueva Transaction
exports.create = (req, res) => {
    // Validar request
    Transactions.create(req.body, function (err, result) {
        if (err) return res.status(404).json(err);
        res.status(200).json(result);
    });
};

// Retrieve and return all notes from the database.
module.exports.findAll = (req, res) => {
    Transactions.find({}, function(err, result){
        if (err) {
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    });
};

// Find a single note with a noteId
module.exports.findOne = (req, res) => {
    console.log(req.params._id);
    Transactions.findById(req.params._id, function(err, result){
        if (err) {
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    });
};

// Update a note identified by the noteId in the request
module.exports.update = (req, res) => {
    Transactions.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.id
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating transaction with id " + req.params.id
        });
    });
};

// Delete a transaction with the specified id in the request
module.exports.delete = (req, res) => {
    Transactions.findByIdAndRemove(req.params.id)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.id
            });
        }
        res.send({message: "Transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete transaction with id " + req.params.id
        });
    });
};


/*
Algunos comandos para probar

CREATE:
curl -XPOST -H "Content-type: application/json" -d '{"sender":{"id":3,"name":"Charly"},"receiver":{"id":2,"name":"Galo"},"_id":"608815a60f43893788a52fa2","amount":5550,"currency":"pesos","date":"2021-03-31T14:13:54.000Z"}' 'http://localhost:3000/transactions'

UPDATE: (actualizar el final de la url con el _id del create anterior) 
curl -XPUT -H "Content-type: application/json" -d '{"sender":{"id":2,"name":"Galo"},"receiver":{"id":3,"name":"Charly"},"amount":512340,"currency":"pesos","date":"2021-03-31T14:13:54.000Z"}' 'http://localhost:3000/transactions/<id del create anterior>'

DELETE:
curl -X DELETE http://localhost:3000/transactions/<id del transaction>

*/