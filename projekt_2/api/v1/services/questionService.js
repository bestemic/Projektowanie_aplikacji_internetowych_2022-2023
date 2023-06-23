const daoCategory = require('../dao/daoCategory');
const daoQuestion = require('../dao/daoQuestion');
const ServiceError = require("../errorHandlers/ServiceError");

const getAllQuestions = async (categoryId) => {
    return await daoQuestion.findAllCategoryQuestions(categoryId);
};

const createQuestion = async (categoryId, question) => {
    const category = await daoCategory.findCategoryById(categoryId);
    if (!category) {
        throw new ServiceError('Nie znaleziono kategorii.', 404);
    }

    if (!question.content || question.content.trim() === '') {
        throw new ServiceError('Brak treści pytania.', 400);
    }

    if (question.isMultipleChoice === undefined) {
        throw new ServiceError('Brak pola isMultipleChoice.', 400);
    }

    if (typeof question.isMultipleChoice !== 'boolean') {
        throw new ServiceError('Pole isMultipleChoice nie jest typu logicznego.', 400);
    }

    const answers = question.answers;
    if (!answers || answers.length < 2) {
        throw new ServiceError('Nieprawidłowa ilość odpowiedzi.', 400);
    }

    answers.forEach((answer) => {
        if (!answer.content || answer.content.trim() === '') {
            throw new ServiceError('Brak treści odpowiedzi.', 400);
        }

        if (answer.isCorrect === undefined) {
            throw new ServiceError('Brak pola isCorrect.', 400);
        }

        if (typeof answer.isCorrect !== 'boolean') {
            throw new ServiceError('Pole isCorrect  nie jest typu logicznego.', 400);
        }
    });

    if (!question.isMultipleChoice) {
        const correctAnswersCount = answers.reduce((count, answer) => {
            if (answer.isCorrect) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);

        if (correctAnswersCount !== 1) {
            throw new ServiceError('Pytania jednokrotnego wyboru muszą mieć dokładnie jedną odpowiedź poprawną.', 400);
        }
    }

    question.categoryId = categoryId;
    return await daoQuestion.createQuestion(question);
};

const getQuiz = async (categoryId, limit) => {
    const category = await daoCategory.findCategoryById(categoryId);
    if (!category) {
        throw new ServiceError('Nie znaleziono kategorii.', 404);
    }

    if (limit < 1) {
        throw new ServiceError('Limit nie może być ujemny.', 400);
    }

    return await daoQuestion.findRandomQuestionsId(categoryId, parseInt(limit));
};

const getQuestion = async (questionId) => {
    return await daoQuestion.findQuestionWithoutCorrectById(questionId);
};

module.exports = {
    getAllQuestions,
    createQuestion,
    getQuiz,
    getQuestion
}