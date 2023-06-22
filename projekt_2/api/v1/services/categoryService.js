const daoCategory = require('../dao/daoCategory');
const ServiceError = require("../errorHandlers/ServiceError");

const getAllCategories = async () => {
    return await daoCategory.findAllCategories();
}

const createCategory = async (category) => {
    if (!category.name) {
        throw new ServiceError('Brak nazwy kategorii', 400);
    }

    if (category.name.length <= 1 || /^\d+$/.test(category.name) || category.name.length > 25) {
        throw new ServiceError('Nieprawidłowa nazwa kategorii', 400);
    }

    const existingCategory = await daoCategory.findCategoryByName(category.name);
    if (existingCategory) {
        throw new ServiceError('Kategoria o podanej nazwie już istnieje', 409);
    }

    return await daoCategory.createCategory(category);
}

module.exports = {
    getAllCategories,
    createCategory
}
