const newAuctionService = require('../services/newAuctionService')

const getIndex = (req, res, data) => {
    res.render('newAuctionIndex', {
        data: data || {}
    });
};

const postAuction = async (req, res) => {
    const data = await newAuctionService.createAuction(req.body);
    getIndex(req, res, data); // TODO
};

module.exports = {
    getIndex,
    postAuction
}