const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const categorySchema = new Schema({
  catagoryName: { type: String, required: true, unique: true },
});
const catagory = model("catagory", categorySchema);
module.exports = catagory;
