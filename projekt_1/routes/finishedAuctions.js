const express = require('express');
const router = express.Router();

const finishedAuctionsController = require('../controllers/finishedAuctionsController')

router.get('/', finishedAuctionsController.getAuctions);

module.exports = router;
