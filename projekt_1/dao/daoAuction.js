const db = require("../models/sqConfig");
const {Op} = require("sequelize");
const Auction = db.auction;

const create = (auction) => {
    return Auction.create(auction)
        .then(data => {
            return data.dataValues;
        })
        .catch(err => {
            return {
                error: true,
                message: err.message
            };
        });
};

const findAllActive = () => {
    const now = new Date();
    return Auction.findAll({
        where: {
            [Op.and]: [
                {
                    start: {
                        [Op.lte]: now
                    }
                },
                {
                    end: {
                        [Op.gt]: now
                    }
                }
            ]
        }
    })
        .then(data => {
            return data.map((auction) => auction.dataValues);
        })
        .catch(err => {
            console.error('Failed to get all active ' + err.message);
            return [];
        });
};

module.exports = {
    create,
    findAllActive
}