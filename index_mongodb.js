const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Database Name
const dbName = 'transactions_db';
const url = 'mongodb://joaco:joaco1996@localhost:27017/' + dbName;
const transcations_collection = 'transactions';

// Create a new MongoClient
const client = new MongoClient(url);

// Insert seed transactions
const insertDocuments = function (db, callback) {
    // Get the transactions collection
    const collection = db.collection(transcations_collection);
    // Insert some documents
    collection.insertMany(seed_transactions, function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection(transcations_collection);
    // Find some documents
    collection.find({currency:'pesos'}).toArray( function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection(transcations_collection);
    // Update document where a is 2, set b equal to 1
    collection.updateOne({"sender.name": "Carlos"}
        , {  $set: { "sender.name":"Charly" } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the first transaction with sender named Carlos to Charly");
        callback(result);
    });
}

const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection(transcations_collection);
    // Delete document where a is 3
    collection.deleteOne({"receiver.name": "Galo"}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the first document where receiver name is Galo");
        callback(result);
    });
}

// Use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    insertDocuments(db, function() {
        findDocuments(db, function() {
            updateDocument(db, function(){
                removeDocument(db,function(){
                    findDocuments(db, function() {
                        client.close();
                    });
                });
            });
        });
    });
});


var seed_transactions = [
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
]