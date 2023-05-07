const daoAuction = require('../dao/daoAuction')

const getAllActive = async () => {
    return await daoAuction.findAllActive();
};

module.exports = {
    getAllActive
}
