const express = require('express');
const router = express.Router();

const auctionsController = require('../controllers/auctionsController')

router.get('/', auctionsController.getAuctions);

module.exports = router;
