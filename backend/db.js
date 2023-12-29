const mongoose = require("mongoose");
const uri = "mongodb+srv://reactmeals:root@cluster0.mcnxmvw.mongodb.net/test";
// "mongodb://localhost:27017/reactmeals"; //reactmeals
// "mongodb+srv://reactmeals:root@cluster0.mcnxmvw.mongodb.net/reactmeals?retryWrites=true&w=majority"; //reactmeals

const mongoDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log("Connected sucessfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;
