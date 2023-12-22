const category = require("../models/Category");
const MealItem = require("../models/MealItems");
const Orders = require("../models/Orders");

const getItems = async (req, res) => {
  try {
    const data = await MealItem.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const placeOrder = async (req, res) => {
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
};

const getOrders = async (req, res) => {
  console.log("ingetorder");
  try {
    const orders = await Orders.find({});
    if (orders) res.json(orders);
    else {
      res.json({ success: false, messege: "No Orders Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, messege: "No Orders Found" });
  }
};
const deleteItem = async (req, res) => {
  try {
    const result = await MealItem.deleteOne({ _id: req.body.id });
    if (result) {
      res.json({ success: true, messege: "Product Deleted Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
};
const addItem = async (req, res) => {
  try {
    console.log(req.body, req.file);
    const result = await MealItem.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
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
};
const getEditedItem = async (req, res) => {
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
};
const editItem = async (req, res) => {
  try {
    // console.log(req.params.id);
    console.log(req.file);
    const data = await MealItem.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          img: req.file.filename,
          category: req.body.category,
        },
      }
    );
    console.log(data, "test");
    if (data) {
      res.json({ success: true, messege: "Item Updated Successfully" });
      // console.log("inside true");
    } else {
      res.status(401).json({ success: false, messege: "Item Not Found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, messege: "Server Error!" });
  }
};

const deleteOrder = async (req, res) => {
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
};
const addCategory = async (req, res) => {
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
};

const getCategory = async (req, res) => {
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
};

const deleteCategory = async (req, res) => {
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
};

module.exports = {
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
};
