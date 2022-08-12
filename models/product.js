const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: false,
      default: "/images/bu-logo.gif"
    },
    price: {
      type: Number,
      required: true,
    },
    quantityInStock: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "products_rochon",
  }
);
const productModel = mongoose.model("ProductModel", productSchema);
module.exports = productModel;
