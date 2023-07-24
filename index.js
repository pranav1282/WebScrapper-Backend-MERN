const express = require("express");
const app = express();
const scrapper = require("./routes/srcapper");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", scrapper);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log("server listning on port : " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
