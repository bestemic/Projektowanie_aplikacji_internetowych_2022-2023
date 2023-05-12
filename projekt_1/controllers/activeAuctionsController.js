const activeAuctionService = require('../services/activeAuctionService')

const getAuctions = async (req, res) => {
    const allActiveAuctions = await activeAuctionService.getAllActive();
    res.render('activeAuctions', {
        auctions: allActiveAuctions
    });
};

const getAuction = async (req, res) => {
    const auction = await activeAuctionService.getActiveAuction(req.params.id);
    res.render('activeAuction', {
        auction: auction,
        info: {success: req.query.success || ''}
    });
};

module.exports = {
    getAuctions,
    getAuction
}