const express = require('express');
const router = express.Router();

const newAuctionsController = require('../controllers/newAuctionsController')

router.get('/', newAuctionsController.getIndex);

router.post('/', (req, res)=>{
    console.log("here");
    console.log(req.body);
    // newAuctionsController.getIndex(req, res);
});

module.exports = router;
