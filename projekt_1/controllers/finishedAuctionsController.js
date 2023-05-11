const finishedAuctionService = require('../services/finishedAuctionService')

const getAuctions = async (req, res) => {
    const allFinishedAuctions = await finishedAuctionService.getAllFinished();
    res.render('finishedAuctions', {
        auctions: allFinishedAuctions
    });
};

module.exports = {
    getAuctions
}