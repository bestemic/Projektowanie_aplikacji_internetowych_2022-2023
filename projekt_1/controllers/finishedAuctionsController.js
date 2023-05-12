const finishedAuctionService = require('../services/finishedAuctionService')

const getAuctions = async (req, res) => {
    const allFinishedAuctions = await finishedAuctionService.getAllFinished();
    res.render('finishedAuctions', {
        auctions: allFinishedAuctions
    });
};

const getAuction = async (req, res) => {
    const finishedAuction = await finishedAuctionService.getFinishedAuction(req.params.id);
    res.render('finishedAuction', {
        auction: finishedAuction
    });
};

module.exports = {
    getAuctions,
    getAuction
}