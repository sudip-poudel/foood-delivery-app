const express = require("express");
const MealItem = require("../models/MealItems");
const User = require("../models/User");
const Orders = require("../models/Orders");
const category = require("../models/Category");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = require("../middlewares/getuser");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, `image_${Date.now()}${file.originalname.trim(" ")}`);
  },
});
const upload = multer({ storage });

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ success: false, exist: true });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      location: req.body.location,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = await jwt.sign(data, process.env.VITE_JWT_SECRET);
    res.status(200).json({ success: true, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log(bcrypt.compareSync(req.body.password, user.password));
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({ success: false, messege: "Incorrect Password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.VITE_JWT_SECRET);
      return res.json({ success: true, authToken });
    } else {
      console.log(user);
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
      address: req.body.address,
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
router.post("/additem", upload.single("file"), async (req, res) => {
  try {
    console.log(req.body, req.file);
    // const file = req.file;
    // const meta = req.body;
    const result = await MealItem.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      // img: uploaded.secure_url,
      img: req.file.filename,
      category: req.body.category,
    });
    console.log(result);
    if (result) {
      res.json({
        success: true,
        messege: "Product Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/getitems/:id", async (req, res) => {
  try {
    const data = await MealItem.findOne({ _id: req.params.id });
    // console.log(data);
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
    // console.log(req.params.id);
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
    // console.log(data);
    if (data) {
      res.json({ success: true, messege: "Item Updated Successfully" });
      // console.log("inside true");
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
router.post("/addcategory", async (req, res) => {
  try {
    console.log(req.body);
    const result = await category.create({
      categoryName: req.body.categoryName,
    });
    if (result) {
      // console.log(result);
      res.json({ success: true, messege: "Category Added" });
    } else {
      res.json({ success: false, messege: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/getcategory", async (req, res) => {
  try {
    const result = await category.find({});
    if (result) res.json(result);
    else {
      res.json({ success: false, messege: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.get("/deletecategory/:id", async (req, res) => {
  try {
    const result = await category.deleteOne({ _id: req.params.id });
    if (result) res.json({ success: true, messege: "Category Deleted" });
    else {
      res.json({ success: false, messege: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
});
router.post("/curruserdata", getUser, async (req, res) => {
  try {
    userId = user.req.id;
    let user = User.findOne({ id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).send({ messege: "Internal Server Error." });
  }
});
module.exports = router;
