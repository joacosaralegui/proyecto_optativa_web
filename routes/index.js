var express = require('express');
var router = express.Router();

// Obtener controller
var ctrlTransactions = require('../controllers/transactions')

// Definir rutas y callbacks 
router.get('/transactions', ctrlTransactions.transactionsList);

// TODO: Agregar las rutas para update create y delete
// https://classroom.google.com/u/0/c/MzA2MDg0ODg1NTEw/a/MzA2MDg0ODg1NTU0/details

// Exportar router
module.exports = router;