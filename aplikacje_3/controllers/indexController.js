const indexService = require('../services/indexService');

const getIndex = (req, res) => {
    res.render('index', {title: 'Currency'});
};

const getExchange = (req, res) => {
    const data = {};
    data.title = 'Currency';
    res.render('indexExchange', {data});
};

const postExchange = async (req, res) => {
    const data = {};
    data.title = 'Currency';
    data.currencyInfo = await indexService.getCurrency(req.body.currencyCode);
    res.render('indexExchange', {data});
};

const getTable = async (req, res) => {
    const data = {};
    data.title = 'Exchange rate table';

    data.exchangeRateTable = await indexService.getTable();
    res.render('indexTable', {data});
};

module.exports = {
    getIndex,
    getExchange,
    postExchange,
    getTable
}