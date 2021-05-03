require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const pairsRoutes = require("./lib/routes/pairs");
const CryptoUpdate = require("./lib/services/crypto-update");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const cryptoUpdate = new CryptoUpdate(3000);
cryptoUpdate.start();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  const allowedMethods = "PUT, POST, PATCH, DELETE, GET";
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", allowedMethods);
    return res.status(200).json();
  }
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json();
  }
  next();
});

app.get("/health-check", (req, res) => {
  res.json({
    status: "healthy",
  });
});

app.use("/pairs", pairsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
