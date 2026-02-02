const mongoose = require("mongoose");

const catogreySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  //   image: {
  //     type: String,
  //     required: true,
  //   },
});

exports.Category = mongoose.model("Category", catogreySchema);
