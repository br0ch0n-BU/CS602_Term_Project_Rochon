const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    quantityOrdered: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "orders_rochon",
  }
);
const orderModel = mongoose.model("OrderModel", orderSchema);
module.exports = orderModel;
