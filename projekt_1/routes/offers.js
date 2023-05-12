const express = require('express');
const router = express.Router();

const offersController = require('../controllers/offersController')

router.post('/:id', offersController.postOffer);

module.exports = router;
