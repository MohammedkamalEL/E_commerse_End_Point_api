const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prodect",
    required: true,
  },
});

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
