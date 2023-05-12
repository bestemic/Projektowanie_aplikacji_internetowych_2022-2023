const daoAuction = require('../dao/daoAuction')
const daoOffer = require('../dao/daoOffer')

const createOffer = async (id, offer) => {
    const auction = await daoAuction.findActiveAuctionById(id);
    if (!auction.id) {
        return {
            success: false
        };
    }

    offer.addTime = new Date();
    offer.auctionId = id;
    offer = await daoOffer.create(offer);
    if (!offer.id) {
        return {
            success: false
        };
    } else {
        return {
            success: true
        };
    }
};

module.exports = {
    createOffer
}