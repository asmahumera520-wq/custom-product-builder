const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  colors: [String],
  sizes: [String],
  image: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);