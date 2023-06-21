const categoryService = require('../services/categoryService');

const getIndex = (req, res) => {
    res.send('category service');
}

module.exports = {
    getIndex
}
