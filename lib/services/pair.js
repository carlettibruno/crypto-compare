const mongoose = require("mongoose");
const Pair = require("../models/pair");

service = {
  save: (pair, mercadoBitcoin, binance, coinbase, callback) => {
    console.log("saving pair..");
    const pairObj = new Pair({
      _id: new mongoose.Types.ObjectId(),
      pair,
      mercadoBitcoin,
      binance,
      coinbase,
    });
    pairObj
      .save()
      .then((result) => {
        console.log(result._id);
        callback(null, result._id);
      })
      .catch((err) => {
        console.log(err);
        callback(err, null);
      });
  },
};

module.exports = service;
