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
    quantity: {
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
