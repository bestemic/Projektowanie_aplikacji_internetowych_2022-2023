const express = require('express');
const categoryQuestionRouter = express.Router({mergeParams: true});
const questionsRouter = express.Router();

const questionsController = require('../controllers/questionController');

categoryQuestionRouter.get('/', questionsController.getQuestions);
categoryQuestionRouter.post('/', questionsController.createQuestion);
categoryQuestionRouter.get('/quiz', questionsController.getQuiz);

questionsRouter.get('/:questionId', questionsController.getQuestion);
questionsRouter.get('/:questionId/correctAnswer', questionsController.getCorrectAnswers);

module.exports = {
    categoryQuestionRouter,
    questionsRouter
};
