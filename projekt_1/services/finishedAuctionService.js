const daoAuction = require('../dao/daoAuction')
const daoOffer = require('../dao/daoOffer')

const getAllFinished = async () => {
    const finishedAuctions = await daoAuction.findAllFinished();

    return finishedAuctions.map(({id, name}) => ({
        id,
        name
    }));
};

const getFinishedAuction = async (id) => {
    const auction = await daoAuction.findFinishedAuctionById(id);

    if (!auction.id) {
        return {};
    }

    const auctionOffers = await daoOffer.findAllOffersForAuction(auction.id);
    auction.offers = auctionOffers.filter((offer) => offer.value <= auction.cost);
    return auction;
};

module.exports = {
    getAllFinished,
    getFinishedAuction
}
