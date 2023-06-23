const categoryService = require('../services/categoryService');
const ServiceError = require('../errorHandlers/ServiceError');

const getCategories = async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        res.status(200).json({status: 200, data: allCategories, message: "Pomyślnie pobrano wszystkie kategorie"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({status: 201, data: category, message: "Pomyślnie stworzono kategorię"});
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
            res.status(200).json({status: 200, data: category, message: "Pomyślnie pobrano kategorię"});
        } else {
            res.status(404).json({status: 404, message: "Nie znaleziono kategorii"});
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

const getQuizCategories = async (req, res) => {
    try {
        const allQuizCategories = await categoryService.getQuizCategories();
        res.status(200).json({
            status: 200,
            data: allQuizCategories,
            message: "Pomyślnie pobrano wszystkie dostępne kategorie quizów."
        });
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    getQuizCategories
}
