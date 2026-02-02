const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
require("dotenv/config");

const prodectRouter = require("./routes/prodect");
const catogoriesRouter = require("./routes/categories");

// middel warw
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());
app.use("/api/v1", prodectRouter);
app.use("/api/v1/categories", catogoriesRouter);

mongoose
  .connect(process.env.URL_DB)
  .then(console.log("yesss"))
  .catch((errr) => console.log(errr));

app.listen(3000, () => console.log("server run....."));
