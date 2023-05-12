const express = require('express');
const router = express.Router();

const finishedAuctionsController = require('../controllers/finishedAuctionsController')

router.get('/', finishedAuctionsController.getAuctions);

router.get('/:id', finishedAuctionsController.getAuction);

module.exports = router;
