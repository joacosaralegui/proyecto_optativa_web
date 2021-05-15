var express = require('express');
var router = express.Router();

var ctrlTransactions = require('../controllers/transactions')

router.get('/transactions', ctrlTransactions.transactionsList);

module.exports = router;