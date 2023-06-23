const questionService = require('../services/questionService');
const ServiceError = require('../errorHandlers/ServiceError');
const categoryService = require("../services/categoryService");

const getQuestions = async (req, res) => {
    console.log(req.params)
    try {
        const allQuestions = await questionService.getAllQuestions(req.params.categoryId);
        res.status(200).json({status: 200, data: allQuestions, message: "Pomyślnie pobrano wszystkie pytania"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const createQuestion = async (req, res) => {
    try {
        const question = await questionService.createQuestion(req.params.categoryId, req.body);
        res.status(201).json({status: 201, data: question, message: "Pomyślnie stworzono pytanie"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const getQuiz = async (req, res) => {
    try {
        const questionsId = await questionService.getQuiz(req.params.categoryId, req.query.limit);
        res.status(200).json({status: 200, data: questionsId, message: "Pomyślnie pobrano id pytań quizowych"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const getQuestion = async (req, res) => {
    try {
        const question = await questionService.getQuestion(req.params.questionId);
        if (question) {
            res.status(200).json({status: 200, data: question, message: "Pomyślnie pobrano pytanie."});
        } else {
            res.status(404).json({status: 404, message: "Nie znaleziono pytania"});
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const getCorrectAnswers = async (req, res) => {

}

module.exports = {
    getQuestions,
    createQuestion,
    getQuiz,
    getQuestion,
    getCorrectAnswers
}