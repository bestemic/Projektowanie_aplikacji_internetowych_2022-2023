const db = require("../models/sqConfig");
const {Op} = require("sequelize");
const Auction = db.auction;

const create = (auction) => {
    return Auction
        .create(auction)
        .then(data => {
            return data.dataValues;
        })
        .catch(err => {
            console.error('Failed to create auction ' + err.message);
            return {};
        });
};

const findAllActive = () => {
    const now = new Date();
    return Auction
        .findAll({
            where: {
                end: {
                    [Op.gt]: now
                }
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

const findActiveAuctionById = async (id) => {
    const now = new Date();
    return Auction
        .findOne({
            where: {
                id: id,
                end: {
                    [Op.gt]: now
                }
            }
        })
        .then(data => {
            return data ? data.dataValues : {};
        })
        .catch(err => {
            console.error('Failed to get active auction by id' + err.message);
            return {};
        });
};

const findAllFinished = () => {
    const now = new Date();
    return Auction
        .findAll({
            where: {
                end: {
                    [Op.lte]: now
                }
            }
        })
        .then(data => {
            return data.map((auction) => auction.dataValues);
        })
        .catch(err => {
            console.error('Failed to get all finished ' + err.message);
            return [];
        });
};

const findFinishedAuctionById = async (id) => {
    const now = new Date();
    return Auction
        .findOne({
            where: {
                id: id,
                end: {
                    [Op.lte]: now
                }
            }
        })
        .then(data => {
            return data ? data.dataValues : {};
        })
        .catch(err => {
            console.error('Failed to get finished auction by id' + err.message);
            return {};
        });
};

module.exports = {
    create,
    findAllActive,
    findActiveAuctionById,
    findAllFinished,
    findFinishedAuctionById
}