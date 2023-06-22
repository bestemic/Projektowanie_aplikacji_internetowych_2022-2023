const db = require("../../../models/sqConfig");
const ServiceError = require("../errorHandlers/ServiceError");
const Category = db.category;

const findAllCategories = () => {
    return Category
        .findAll({
            order: [
                ["name", "ASC"]
            ]
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const createCategory = (category) => {
    return Category
        .create(category)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const findCategoryByName = (name) => {
    return Category
        .findOne({
            where: {
                name: name
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const findCategoryById = (id) => {
    return Category
        .findByPk(id)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

module.exports = {
    findAllCategories,
    createCategory,
    findCategoryByName,
    findCategoryById
}