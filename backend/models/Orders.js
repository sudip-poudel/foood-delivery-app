const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const orderSchema = new Schema({
  orderedIems: Array,
  date: { type: Date, default: Date.now },
  totalAmount: Number,
  userId: { type: String, required: true, unique: true },
  address: String,
  // time: { type: Timestamp, default: Date.now() },
});
const Orders = model("ordered_items", orderSchema);
module.exports = Orders;
