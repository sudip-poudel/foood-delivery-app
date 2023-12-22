const express = require("express");
const User = require("../models/User");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const getUser = require("../middlewares/getuser");
const {
  createUser,
  loginUser,
  loginAdmin,
  getCurrentUser,
} = require("../controllers/userController");
const {
  getItems,
  placeOrder,
  getOrders,
  deleteItem,
  addItem,
  getEditedItem,
  editItem,
  deleteOrder,
  addCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/itemController");
const adminProtected = require("../middlewares/adminProtected");
const userProtected = require("../middlewares/userProtected");
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

router.post("/createuser", createUser);

router.post("/login", loginUser);

router.post("/adminlogin", loginAdmin);

router.get("/currentuser", getCurrentUser);

router.get("/getitems", getItems);

router.post("/order", userProtected, placeOrder);

router.get("/getorders", adminProtected, getOrders);

router.post("/deleteproduct", adminProtected, deleteItem);

router.post("/additem", adminProtected, upload.single("file"), addItem);

router.get("/getitems/:id", adminProtected, getEditedItem);

router.post("/edititem/:id", adminProtected, upload.single("file"), editItem);

router.delete("/deleteorder/:id", adminProtected, deleteOrder);

router.post("/addcategory", adminProtected, addCategory);

router.get("/getcategory", getCategory);

router.get("/deletecategory/:id", adminProtected, deleteCategory);

// router.get("/validate-token", getUser, async (req, res) => {
//   try {
//     const user = await User.findById(req.user);
//     if (!user) {
//       return res
//         .sendStatus(401)
//         .send({ success: false, messege: "Not a valid token" });
//     }
//     res.send({ success: true, data: user.role });
//   } catch (error) {
//     return res
//       .sendStatus(401)
//       .send({ success: false, messege: "Not a valid token" });
//   }
// });
module.exports = router;
