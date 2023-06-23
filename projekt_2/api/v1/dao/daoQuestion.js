const db = require("../../../models/sqConfig");
const ServiceError = require("../errorHandlers/ServiceError");
const Question = db.question;
const Answer = db.answer;

const findAllCategoryQuestions = (categoryId) => {
    return Question
        .findAll({
            where: {
                categoryId: categoryId
            },
            include: [{
                model: Answer,
                as: 'answers'
            }]
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const createQuestion = (question) => {
    return Question
        .create(question, {
            include: [{
                model: Answer,
                as: 'answers'
            }]
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const findRandomQuestionsId = (categoryId, limit) => {
    return Question
        .findAll({
            where: {
                categoryId: categoryId
            },
            attributes: ['id'],
            order: db.sequelize.random(),
            limit: limit
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const findQuestionWithoutCorrectById = (id) => {
    return Question
        .findByPk(id, {
            include: [{
                model: Answer,
                attributes: ['id', 'content'],
                as: 'answers',
            }]
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const getCorrectAnswersForQuestion = (id) => {
    return Answer
        .findAll({
            attributes: ['id'],
            where: {
                questionId: id,
                isCorrect: true
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error: ' + err.message, 500);
        });
};

module.exports = {
    findAllCategoryQuestions,
    createQuestion,
    findRandomQuestionsId,
    findQuestionWithoutCorrectById,
    getCorrectAnswersForQuestion
}