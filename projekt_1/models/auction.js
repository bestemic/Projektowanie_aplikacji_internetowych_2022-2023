module.exports = (sequelize, Sequelize) => {
    return sequelize.define("auction", {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            purchaser: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            start: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end: {
                type: Sequelize.DATE,
                allowNull: false
            },
            cost: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: 'auctions'
        });
};