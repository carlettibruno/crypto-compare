const axios = require('axios');

class MercadoBitcoin {

    endpoint = 'https://www.mercadobitcoin.net/api';

    tickerMethod = 'ticker';

    prices(coin, callback) {
        axios.get(`${this.endpoint}/${coin}/${this.tickerMethod}`)
        .then(function (response) {
            callback(null, response.data.ticker);
        })
        .catch(function (error) {
            callback(error, null);
        });
    }

}
module.exports = MercadoBitcoin;