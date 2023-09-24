const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mealSchema = new Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  img: String,
  category: String,
});
const food_items = model("food_items", mealSchema);
module.exports = food_items;
