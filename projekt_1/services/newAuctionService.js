const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)

const daoAuction = require('../dao/daoAuction')

const createAuction = async (auction) => {
    const validTime = dayjs(auction.end).isSameOrAfter(dayjs(auction.start))
    if (!validTime) {
        return {
            error: 'Niepoprawne dane. Czas zakończenia przetargu musi być po czasie rozpoczęcia.'
        };
    }

    auction = await daoAuction.create(auction);

    if (auction.error) {
        return {
            error: 'Wystąpił błąd podczas zapisywania przetargu.'
        };
    } else {
        return {
            success: auction.id
        };
    }
};

module.exports = {
    createAuction
}