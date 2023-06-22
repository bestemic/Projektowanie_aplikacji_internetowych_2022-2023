const daoCategory = require('../dao/daoCategory');
const daoQuestion = require('../dao/daoQuestion');
const ServiceError = require("../errorHandlers/ServiceError");

const getAllQuestions = async (categoryId) => {
    return await daoQuestion.findAllCategoryQuestions(categoryId);
};

const createQuestion = async (categoryId, question) => {
    // TODO
};

module.exports = {
    getAllQuestions,
    createQuestion,
}
