const daoAuction = require('../dao/daoAuction')

const getAllFinished = async () => {
    const finishedAuctions = await daoAuction.findAllFinished();

    return finishedAuctions.map(({id, name}) => ({
        id,
        name
    }));
};

module.exports = {
    getAllFinished
}
