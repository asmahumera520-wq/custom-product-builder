const express = require("express");
const router = express.Router();
const Product = require("../modules/product");

router.post("/products", async (req, res) => {
  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    });

    await product.save();
    res.json(product);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;