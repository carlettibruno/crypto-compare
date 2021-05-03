const mongoose = require('mongoose');

const pairSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mercadoBitcoin: { type: Number },
    binance: { type: Number },
    coinbase: { type: Number },
    pair: { type: String, require: true, maxlength: 10 }
});

module.exports = mongoose.model('Pair', pairSchema);