const db = require("../models/sqConfig");
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

module.exports = {
    create
}