const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mealSchema = new Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  img: { type: String, unique: true },
  category: String,
});
const food_items = model("food_items", mealSchema);
module.exports = food_items;
