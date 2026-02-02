const express = require("express");
const { Prodect } = require("../models/prodect");

const rouret = express.Router();

rouret.get("/", async (req, res) => {
  const prodectList = await Prodect.find();
  res.status(200).send(prodectList);
});

rouret.post("/prodect", (req, res) => {
  const pro = new Prodect(req.body);

  pro
    .save()
    .then((createdItem) => res.status(200).json(createdItem))
    .catch((err) => console.log(err));
});

module.exports = rouret;
