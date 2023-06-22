const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const questionsRouter = require('../routes/questions');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/:categoryId', categoryController.getCategory);

router.use('/:categoryId/questions', questionsRouter);

module.exports = router;
