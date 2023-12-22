const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateAuthToken = require("../helpers/generateAuthToken");

const createUser = async (req, res) => {
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
    const authToken = generateAuthToken(user._id);
    res.cookie("authToken", authToken, {
      expires: new Date(Date.now() + 100 * 60 * 60 * 24 * 15),
    });
    res.status(200).json({
      success: true,
      user: {
        authToken,
        id: user._id,
        email: user.email,
        username: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log(bcrypt.compareSync(req.body.password, user.password));
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({ success: false, messege: "Incorrect Password" });
      }

      const authToken = generateAuthToken(user._id);
      res.cookie("authToken", authToken, {
        expires: new Date(Date.now() + 100 * 60 * 60 * 24 * 15),
      });
      return res.json({
        success: true,
        user: {
          authToken,
          id: user._id,
          email: user.email,
          username: user.name,
        },
      });
    } else {
      console.log(user);
      return res.json({ success: false, messege: "User Doesn't Exists" });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, messege: "Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        if (data.role === "admin") {
          const authToken = generateAuthToken(data._id);
          res.cookie("authToken", authToken, {
            expires: new Date(Date.now() + 100 * 60 * 60 * 24 * 15),
          });
          return res.json({ success: true });
        }
        return res.json({ success: false, messege: "You are not admin" });
      } else {
        return res.json({ success: false, messege: "Incorrect Password" });
      }
    } else {
      console.log(data);
      return res.json({ success: false, messege: "User Doesn't Exists" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, messege: "Server Error" });
  }
};
const getCurrentUser = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
      const userId = decoded.user.id;
      let user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ messege: "Internal Server Error." });
    }
  }
};

module.exports = { createUser, loginUser, loginAdmin, getCurrentUser };
