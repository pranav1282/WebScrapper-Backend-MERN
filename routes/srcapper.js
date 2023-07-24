const express = require("express");
const { scrapperC } = require("../controllers/scrapperC");

const scrapper = express.Router();
scrapper.post("/", scrapperC);

module.exports = scrapper;
