var mongoose = require('mongoose');

// Variable de Mongoose Schema 
var Schema = mongoose.Schema;

// Definir schema de transaccion
var transactionSchema = new Schema({
    sender: {
        id: Number,
        name: String
    },
    receiver: {
        id: Number,
        name: String
    },
    amount: Number,
    currency: String,
    date: { type: Date, default: Date.now }
});

// Campo virtual (depende de otros campos y no se agrega en la collecion)
transactionSchema.virtual('amountWithCurrency').get(function () {
    return this.amount + ' ' + this.currency; 
});

// Método estático para encontrar por nombre del remitente
transactionSchema.statics.findBySenderName = function (name, cb) {
    return this.find({ "sender.name": name }, cb);
}

// Método estatico para encontrar transacciones por nombre del destinatario
transactionSchema.statics.findByReceiverName = function (name, cb) {
    return this.find({ "receiver.name": new RegExp(name, 'i') }, cb);
}

module.exports = transactionSchema;