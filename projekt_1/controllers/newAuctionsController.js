const newAuctionService = require('../services/newAuctionService')

const getAuction = (req, res) => {
    res.render('newAuction', {
        info: {}
    });
};

const postAuction = async (req, res) => {
    const info = await newAuctionService.createAuction(req.body);
    res.render('newAuction', {
        info: info
    });
};

module.exports = {
    getAuction,
    postAuction
}