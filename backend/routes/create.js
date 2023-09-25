const express = require("express");
const MealItem = require("../models/MealItems");
const User = require("../models/User");
const Orders = require("../models/Orders");
const Catagory = require("../models/Catagory");
const router = express.Router();

router.get("/getitems", async (req, res) => {
  try {
    const data = await MealItem.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
router.post("/createuser", async (req, res) => {
  try {
    console.log(req.body);
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.json({ success: false, exist: true });
    }
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      if (req.body.password !== data.password) {
        return res.json({ success: false, messege: "Incorrect Password" });
      } else {
        return res.json({ success: true });
      }
    } else {
      console.log(data);
      return res.json({ success: false, messege: "User Doesn't Exists" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.post("/adminlogin", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      if (req.body.password !== data.password) {
        return res.json({ success: false, messege: "Incorrect Password" });
      } else if (data.role !== "admin") {
        return res.json({ success: false, messege: "You are not admin" });
      } else {
        return res.json({ success: true });
      }
    } else {
      console.log(data);
      return res.json({ success: false, messege: "User Doesn't Exists" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});

router.post("/order", async (req, res) => {
  console.log(req.body);
  try {
    const result = await Orders.create({
      orderedIems: req.body.orderedItems,
      totalAmount: req.body.totalAmount,
      userId: req.body.email,
    });
    if (result) res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/getorders", async (req, res) => {
  const orders = await Orders.find({});
  if (orders) res.json(orders);
  else {
    res.json({ success: false, messege: "No Orders Found" });
  }
});

router.post("/deleteproduct", async (req, res) => {
  try {
    const result = await MealItem.deleteOne({ _id: req.body.id });
    if (result) {
      res.json({ success: true, messege: "Product Deleted Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.post("/additem", async (req, res) => {
  try {
    const result = await MealItem.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img,
      category: req.body.category,
    });
    if (result) {
      res.json({ success: true, messege: "Product Added Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/getitems/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await MealItem.findOne({ _id: req.params.id });
    console.log(data);
    if (data) res.json(data);
    else {
      res.json({ success: false, messege: "Item Not Found!" });
    }
  } catch (error) {
    res.sendStatus(404).json({ success: false, messege: "Server Error!" });
  }
});
router.post("/edititem/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await MealItem.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          img: req.body.img,
          category: req.body.category,
        },
      }
    );
    console.log(data);
    if (data) {
      res.json({ success: true, messege: "Item Updated Successfully" });
      console.log("inside true");
    } else {
      res.json({ success: false, messege: "Item Not Found!" });
    }
  } catch (error) {
    res.sendStatus(404).json({ success: false, messege: "Server Error!" });
  }
});
router.post("/deleteorder/:id", async (req, res) => {
  try {
    const result = await Orders.deleteOne({ _id: req.params.id });
    if (result) res.json({ success: true, messege: "Order Deleted" });
    else {
      res.json({ success: false, messege: "Order Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.post("/addcatagory", async (req, res) => {
  try {
    console.log(req.body);
    const result = await Catagory.create({
      catagoryName: req.body.catagoryName,
    });
    if (result) {
      console.log(result);
      res.json({ success: true, messege: "Category Added" });
    } else {
      res.json({ success: false, messege: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/getcatagory", async (req, res) => {
  try {
    const result = await Catagory.find({});
    if (result) res.json(result);
    else {
      res.json({ success: false, messege: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/deletecatagory/:id", async (req, res) => {
  try {
    const result = await Catagory.deleteOne({ _id: req.params.id });
    if (result) res.json({ success: true, messege: "Category Deleted" });
    else {
      res.json({ success: false, messege: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
module.exports = router;
