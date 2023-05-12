const db = require("../models/sqConfig");
const Offer = db.offer;

const create = (offer) => {
    return Offer
        .create(offer)
        .then(data => {
            return data.dataValues;
        })
        .catch(err => {
            console.error('Failed to create offer ' + err.message);
            return {};
        });
};

const findAllOffersForAuction = (auctionId) => {
    return Offer
        .findAll({
            where: {
                auctionId: auctionId
            },
            order: [
                ["value", "ASC"]
            ]
        })
        .then(data => {
            return data.map((offer) => offer.dataValues);
        })
        .catch(err => {
            console.error('Failed to get all offers for auction ' + err.message);
            return [];
        });
};

module.exports = {
    create,
    findAllOffersForAuction
}