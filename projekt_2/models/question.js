module.exports = (sequelize, Sequelize) => {
    return sequelize.define("question", {
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isMultipleChoice: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: 'questions'
        });
};