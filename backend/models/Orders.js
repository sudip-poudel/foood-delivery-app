const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const orderSchema = new Schema({
	orderedIems: Array,
	date: { type: Date, default: Date.now },
	totalAmount: Number,
	userId: String,
});
const Orders = model("ordered_items", orderSchema);
module.exports = Orders;
