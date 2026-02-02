const mongoose = require("mongoose");

const prodectSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

exports.Prodect = mongoose.model("prodect", prodectSchema);
