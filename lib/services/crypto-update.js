const MercadoBitcoin = require("../mercadobitcoin/mercado-bitcoin");

const pairService = require("./pair");

const mercadoBitcoin = new MercadoBitcoin();
const Binance = require("node-binance-api");
const binance = new Binance().options({
  // APIKEY: process.env.BINANCE_KEY,
  // APISECRET: process.env.BINANCE_SECRET,
});

class CryptoUpdate {
  constructor(frequency) {
    this.frequency = frequency;
  }

  start() {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(() => {
      console.log("Checking prices");
      const mercadoBitcoinPromise = new Promise((resolve) => {
        mercadoBitcoin.prices("BTC", (error, ticker) => {
          if (!ticker) {
            resolve(null);
          } else {
            resolve(ticker.last);
          }
        });
      });
      const binancePromise = new Promise((resolve) => {
        binance.prices("BTCUSDT", (error, ticker) => {
          resolve(ticker.BTCUSDT);
        });
      });

      Promise.all([mercadoBitcoinPromise, binancePromise]).then((prices) => {
        pairService.save(
          "BTC-CASH",
          prices[0],
          prices[1],
          null,
          (err, id) => {}
        );
      });
    }, this.frequency);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
module.exports = CryptoUpdate;
