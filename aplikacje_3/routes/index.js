const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController')

router.get('/', indexController.getIndex);

router.get('/exchange', indexController.getExchange);
router.post('/exchange', indexController.postExchange);

router.get('/exchange-table', indexController.getTable);

module.exports = router;
