const express = require('express');
const router = express.Router({ mergeParams: true });

const questionsController = require('../controllers/questionController');

router.get('/', questionsController.getQuestions);
router.post('/', questionsController.createQuestion);

module.exports = router;
