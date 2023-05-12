const offerService = require('../services/offerService')

const postOffer = async (req, res) => {
    const info = await offerService.createOffer(req.params.id, req.body);
    res.redirect('/auctions/active/' + req.params.id + '/?success=' + info.success);
};

module.exports = {
    postOffer
}