const express = require('express');
const router = express.Router();

const newAuctionsController = require('../controllers/newAuctionsController')

router.get('/', newAuctionsController.getIndex);

router.post('/', newAuctionsController.postAuction);

module.exports = router;
