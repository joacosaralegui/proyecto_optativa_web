var mongoose = require('mongoose')
var transactionSchema = require('../schemas/transactions')

// Connectarse a mongo con mongoose
const dbName = 'transactions_db';
const url = 'mongodb://joaco:joaco1996@localhost:27017/' + dbName;
const connection = mongoose.createConnection(url);

// Crear o traer la coleccion Transactions
var Transactions = connection.model('Transactions', transactionSchema);

module.exports.transactionsList = function(req, res){
    Transactions.find({}, function(err, result){
        if (err) {
            sendJsonResponse(res,404,err);
            return;
        }
        sendJsonResponse(res, 200, result);
    });
}