const express = require("express");
const routes = express.Router();
const { Order } = require("../models/order");
const dataNotFound = require("../middleware/dataNotFound");
const { OrderItem } = require("../models/orderItem");

routes.get("/", async (req, res) => {
  const allOrder = await Order.find().populate("user").sort("-dateOrdred");
  if (dataNotFound(res, allOrder, "no order Found ! ")) return;

  res.status(200).json(allOrder);
});

routes.get("/:id", async (req, res) => {
  const specafecOrder = await Order.findById(req.params.id)
    .populate("user")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });
  if (dataNotFound(res, specafecOrder, "no order Found ! ")) return;

  res.status(200).json(specafecOrder);
});

routes.post("/", async (req, res) => {
  const OrderItemsData = req.body.orderItems.map(async (item) => {
    let newOrderItem = new OrderItem({
      quantity: item.quantity,
      product: item.product,
    });
    newOrderItem = await newOrderItem.save();
    return newOrderItem._id;
  });

  const allItenOrderData = await Promise.all(OrderItemsData);

  const totalPrice = await Promise.all(
    allItenOrderData.map(async (item) => {
      const ordelItem = await OrderItem.findById(item).populate(
        "product",
        "price",
      );
      const totlaPrice = ordelItem.product.price * ordelItem.quantity;
      return totlaPrice;
    }),
  );

  const totalPrices = totalPrice.reduce((a, b) => a + b, 0);
  console.log(totalPrices);

  let addOrder = new Order({
    ...req.body,
    orderItems: allItenOrderData,
    totalPrice: totalPrices,
  });

  addOrder = await addOrder.save();

  if (dataNotFound(res, addOrder, "error in order post 2")) return;

  res.status(200).json(addOrder);
});

routes.put("/:id", async (req, res) => {
  const newUpdataOrder = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  if (dataNotFound(res, newUpdataOrder, "no data Found")) return;
  res.send(newUpdataOrder);
});

routes.get("/get/totalsalce", async (req, res) => {
  const totla = await Order.aggregate([
    { $group: { _id: null, totalPrice: { $sum: "$totalPrice" } } },
  ]);

  res.send(totla);
});

routes.get('/get/count', async(req, res) => {
    const count = await Order.countDocuments()
    res.send(count)
})

module.exports = routes;
