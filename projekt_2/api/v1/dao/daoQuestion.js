const db = require("../../../models/sqConfig");
const ServiceError = require("../errorHandlers/ServiceError");
const Question = db.question;

const findAllCategoryQuestions = (categoryId) => {
    return Question
        .findAll({
            where: {
                categoryId: categoryId
            }
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
        .create(question)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

module.exports = {
    findAllCategoryQuestions,
    createQuestion
}