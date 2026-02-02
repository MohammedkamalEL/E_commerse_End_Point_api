const express = require("express");
const { Category } = require("../models/category");

const routes = express.Router();

routes.get("/", async (req, res) => {
  const allCategory = await Category.find({});
  if (!allCategory) {
    return res.status(500).send("error fetch data or network error");
  }
  res.status(200).json(allCategory);
});

routes.get("/:id", async (req, res) => {
  const finfCat = await Category.findById(req.params.id);
  if (!finfCat) {
    return res.status(500).send("error fetch data or network error");
  }
  res.status(200).json({ status: true, data: { finfCat } });
});

routes.post("/", async (req, res) => {
  let categor = new Category(req.body);
  categor = await categor.save();

  if (!categor) {
    return res.status(404).json({
      sussecc: false,
      error: "no date add ",
    });
  }

  res.status(201).send(categor);
});

routes.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((catogrey) => {
      if (catogrey) {
        return res.status(200).json({ status: true, message: "done" });
      } else {
        return res.status(200).json({ status: true, message: "done" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ status: false, message: err });
    });
});

routes.put("/:id", async (req, res) => {
  const ubdatecat = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!ubdatecat) {
    return res.status(404).json({
      sussecc: false,
      error: "no date add ",
    });
  }

  res.status(200).json({ status: true, data: { ubdatecat } });
});

module.exports = routes;
