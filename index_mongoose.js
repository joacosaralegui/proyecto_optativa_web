// Importar mongoosse
var mongoose = require('mongoose');

// Connectarse a mongo con mongoose
const dbName = 'transactions_db';
const url = 'mongodb://joaco:joaco1996@localhost:27017/' + dbName;
const connection = mongoose.createConnection(url);

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

// Crear o traer la coleccion Transactions
var Transactions = connection.model('Transactions', transactionSchema);

// Transacciones para cargar inicialmente
var seedTransactions = [
    {
        sender: {
            id: 1,
            name: "Joaco"
        },
        receiver: {
            id:2,
            name: "Galo"
        },
        amount: 250,
        currency: "pesos",
        date: "2021-04-23 14:13:54"
    },
    {
        sender: {
            id: 1,
            name: "Joaco"
        },
        receiver: {
            id:3,
            name: "Carlos"
        },
        amount: 50,
        currency: "dólares",
        date: "2021-03-23 14:13:54"
    }, 
    {
        sender: {
            id: 3,
            name: "Carlos"
        },
        receiver: {
            id:2,
            name: "Galo"
        },
        amount: 5550,
        currency: "pesos",
        date: "2021-03-31 14:13:54"
    }
];


// Función para guardar una transacción nueva
function saveTransaction(Transactions,data) {
    Transactions.create(data, function (err, small) {
        if (err) return console.log(err);
        console.log("Saved!");
    })
}

// Cargar en la collecion las primeras transacciones (seed)
for(var transaction of seedTransactions){
    saveTransaction(Transactions, transaction);
}


// Buscar todos los que tienen nombre Joaco
Transactions.findBySenderName("Joaco",function(err,transactions){
    console.log(transactions);
    console.log("TOTAL: " + transactions.length);
});

// Borrar uno
Transactions.deleteOne({ "sender.name": "Joaco" }, function (err) {
    if (err) console.log(err);
    // deleted at most one tank document
    console.log("Se borró cómo máximo un registro")
});

// Actualizar uno
Transactions.findOneAndUpdate(
    {"receiver.name":"Galo"}, 
    {"receiver.name": "Galo Pianciola"},
    {new:true}
).then(
    result=>console.log(result)
);  