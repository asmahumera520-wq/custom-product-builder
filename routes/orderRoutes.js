const express = require("express");
const router = express.Router();
const Order = require("../modules/order");

router.post("/orders", async (req, res) => {
  try {

    const order = new Order({
      userId: req.body.userId,
      products: req.body.products,
      totalPrice: req.body.totalPrice
    });

    await order.save();
    res.json(order);

  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/orders", async (req, res) => {
  const orders = await Order.find().populate("products.productId");
  res.json(orders);
});

module.exports = router;