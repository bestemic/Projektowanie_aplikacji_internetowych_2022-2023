module.exports = (sequelize, Sequelize) => {
    return sequelize.define("category", {
            name: {
                type: Sequelize.STRING
            }
        },
        {
            tableName: 'categories'
        });
};