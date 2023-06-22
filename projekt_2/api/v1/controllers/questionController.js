const questionService = require('../services/questionService');
const ServiceError = require('../errorHandlers/ServiceError');

const getQuestions = async (req, res) => {
    console.log(req.params)
    try {
        const allQuestions = await questionService.getAllQuestions(req.params.categoryId);
        res.status(200).json({status: 200, data: allQuestions, message: "Successfully retrieved questions"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const createQuestion = async (req, res) => {
    try {
        const question = await questionService.createQuestion(req.params.categoryId, req.body);
        res.status(201).json({status: 201, data: question, message: "Successfully created question"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

module.exports = {
    getQuestions,
    createQuestion,
}
