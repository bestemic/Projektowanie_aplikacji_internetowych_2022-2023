const activeAuctionService = require('../services/activeAuctionService')

const getIndex = async (req, res) => {
    const allActiveAuctions = await activeAuctionService.getAllActive();
    res.render('activeAuctionIndex', {
        data: allActiveAuctions
    });
};

module.exports = {
    getIndex
}