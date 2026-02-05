const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
require("dotenv/config");

const prodectRouter = require("./routes/prodect");
const catogoriesRouter = require("./routes/categories");
const userRout = require("./routes/user");
const orderRouter = require("./routes/order");

const authToken = require("./middleware/auth");

// middel warw
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());
app.use(authToken());
app.use("/api/v1/user", userRout);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1", prodectRouter);
app.use("/api/v1/categories", catogoriesRouter);

mongoose
  .connect(process.env.URL_DB)
  .then(console.log("yesss"))
  .catch((errr) => console.log(errr));

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
  next();
});

app.listen(3000, () => console.log("server run....."));
