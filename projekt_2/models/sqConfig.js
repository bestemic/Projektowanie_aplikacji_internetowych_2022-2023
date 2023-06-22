const dbConfig = require("./config/db.js");

const Sequelize = require("sequelize");

console.log(dbConfig);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.js")(sequelize, Sequelize);
db.question = require("./question.js")(sequelize, Sequelize);
db.answer = require("./answer.js")(sequelize, Sequelize);

db.category.hasMany(db.question);
db.question.belongsTo(db.category);
db.question.hasMany(db.answer);
db.answer.belongsTo(db.question);

db.sequelize.sync({force: false})
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

module.exports = db;