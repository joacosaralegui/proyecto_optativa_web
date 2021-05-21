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
