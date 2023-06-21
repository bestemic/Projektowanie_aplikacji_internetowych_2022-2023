const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Quiz app API v1');
});

module.exports = router;
