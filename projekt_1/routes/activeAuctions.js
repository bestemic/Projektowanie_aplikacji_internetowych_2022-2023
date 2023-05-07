const express = require('express');
const router = express.Router();

const activeAuctionsController = require('../controllers/activeAuctionsController')

router.get('/', activeAuctionsController.getIndex);

module.exports = router;
