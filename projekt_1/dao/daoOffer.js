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

module.exports = {
    create
}