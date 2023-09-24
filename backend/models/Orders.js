const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const orderSchema = new Schema({
  orderedIems: Array,
  date: { type: Date, default: Date.now },
  totalAmount: Number,
  userId: { type: String, required: true, unique: true },
});
const Orders = model("ordered_items", orderSchema);
module.exports = Orders;
