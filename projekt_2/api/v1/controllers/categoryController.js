const categoryService = require('../services/categoryService');
const ServiceError = require('../errorHandlers/ServiceError');

const getCategories = async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        res.status(200).json({status: 200, data: allCategories, message: "Successfully retrieved categories"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({status: 201, data: category, message: "Successfully created category"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.categoryId);
        if (category) {
            res.status(200).json({status: 200, data: category, message: "Successfully retrieved category"});
        } else {
            res.status(404).json({status: 404, message: "Category not found"});
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

module.exports = {
    getCategories,
    createCategory,
    getCategory
}
