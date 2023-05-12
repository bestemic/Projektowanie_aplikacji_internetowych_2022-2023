module.exports = (sequelize, Sequelize) => {
    return sequelize.define("offer", {
            contractor: {
                type: Sequelize.STRING,
                allowNull: false
            },
            value: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            addTime: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            tableName: 'offers'
        });
};