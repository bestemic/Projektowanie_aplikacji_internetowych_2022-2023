const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const {categoryQuestionRouter} = require('../routes/questions');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/quizzes', categoryController.getQuizCategories);
router.get('/:categoryId', categoryController.getCategory);

router.use('/:categoryId/questions', categoryQuestionRouter);

module.exports = router;
