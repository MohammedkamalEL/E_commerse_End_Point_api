const mongoose = require("mongoose");

const docToJSON = (doc, ret) => {
  // لاحظ هنا أنك تستخدم passwordHash وليس password بناءً على الـ Schema الخاص بك
//   delete ret.passwordHash;
//   delete ret.__v;
  return ret;
};

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    shippingaddres1: {
      type: String,
      required: true,
    },
    shippingaddres2: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateOrdred: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true, transform: docToJSON },
    toObject: { virtuals: true, transform: docToJSON },
  },
);

exports.Order = mongoose.model("Order", orderSchema);
