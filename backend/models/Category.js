const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const categorySchema = new Schema({
  categoryName: { type: String, required: true, unique: true },
});
const category = model("category", categorySchema);
module.exports = category;
