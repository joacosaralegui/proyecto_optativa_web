var express = require('express');
var router = express.Router();

// Obtener controller
var ctrlTransactions = require('../controllers/transactions')

// Crear transaccion
router.post('/transactions', ctrlTransactions.create);

// Traer todas las transacciones
router.get('/transactions', ctrlTransactions.findAll);

// Traer una transaccion
router.get('/transactions/:_id', ctrlTransactions.findOne);

// Actualizar una transaccion
router.put('/transactions/:id', ctrlTransactions.update);

// Borrar una transaccion
router.delete('/transactions/:id', ctrlTransactions.delete);

// Exportar router
module.exports = router;