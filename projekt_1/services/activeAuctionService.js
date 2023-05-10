const daoAuction = require('../dao/daoAuction')

const getAllActive = async () => {
    const activeAuctions = await daoAuction.findAllActive();
    const now = new Date();

    return activeAuctions.map(({id, name, start, end}) => ({
        id,
        name,
        start,
        end,
        isStarted: new Date(start) < now,
    }));
};

const getActiveAuction = async (id) => {
    const auction = await daoAuction.findActiveAuctionById(id);
    console.log(auction)
    const now = new Date();

    if (!auction.id) {
        return {}
    } else {
        return {
            id: auction.id,
            name: auction.name,
            purchaser: auction.purchaser,
            description: auction.description,
            start: auction.start,
            end: auction.end,
            isStarted: new Date(auction.start) < now,
        };
    }
};

module.exports = {
    getAllActive,
    getActiveAuction
}
