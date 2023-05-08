const express = require('express');
const router = express.Router();

const activeAuctionsController = require('../controllers/activeAuctionsController')

router.get('/', activeAuctionsController.getAuctions);

router.get('/:id', activeAuctionsController.getAuction);

module.exports = router;
