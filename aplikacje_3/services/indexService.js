const getCurrency = (code) => {
    const currencyInfo = {};
    const url = 'https://api.nbp.pl/api/exchangerates/rates/a/' + code + '/?format=json';
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            currencyInfo.currency = data.currency;
            currencyInfo.code = data.code;
            currencyInfo.exchangeRate = data.rates[0].mid;
            return currencyInfo;
        })
        .catch((error) => {
            currencyInfo.error = 'Currency code not found';
            return currencyInfo;
        });
};

const getTable = () => {
    const exchangeRateTable = {};
    const url = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json';
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            exchangeRateTable.date = data[0].effectiveDate;
            exchangeRateTable.rows = data[0].rates;
            return exchangeRateTable;
        })
        .catch((error) => {
            exchangeRateTable.error = "Error occurred";
            return exchangeRateTable;
        });
};

module.exports = {
    getCurrency,
    getTable
}