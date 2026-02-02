const express = require("express");
const { Prodect } = require("../models/prodect");
const { Category } = require("../models/category");
const { default: mongoose } = require("mongoose");

const rouret = express.Router();

rouret.get("/", async (req, res) => {
  const prodectList = await Prodect.find();
  // const prodectList = await Prodect.find().select("countIstock name");
  res.status(200).send(prodectList);
});

rouret.get("/getCount", async (req, res) => {
  const prodectList = await Prodect.countDocuments();
  res.status(200).send(prodectList);
});

rouret.get("/isfeatcher/:limt", async (req, res) => {
  const limt = req.params.limt ? req.params.limt : 0;
  const prodectList = await Prodect.find({ isFeatured: true }).limit(+limt);
  res.status(200).send(prodectList);
});

rouret.get("/:id", async (req, res) => {
  const prodectList = await Prodect.findById(req.params.id).populate("Category",);
  res.status(200).send(prodectList);
});

rouret.post("/prodect", async (req, res) => {
  const cat = await Category.findById(req.body.category);
  if (!cat) {
    res.status(400).json({ status: false, message: " invaled category" });
  }
  let pro = new Prodect(req.body);
  pro = await pro.save();
  if (!pro) {
    res.status(400).json({ status: false });
  }
  res.status(200).json(pro);
});

rouret.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({
      sussecc: false,
      error: "no date add ",
    });
  }

  const ubdatecat = await Prodect.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!ubdatecat) {
    return res.status(404).json({
      sussecc: false,
      error: "no date add ",
    });
  }

  res.status(200).json({ status: true, data: ubdatecat });
});

module.exports = rouret;
