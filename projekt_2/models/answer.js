module.exports = (sequelize, Sequelize) => {
    return sequelize.define("answer", {
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isCorrect: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: 'answers'
        });
};