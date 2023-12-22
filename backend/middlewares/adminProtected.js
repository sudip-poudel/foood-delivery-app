const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const adminProtected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
      const user = await User.findById(decoded?.user.id).select("-password");
      if (user.role !== "admin") {
        res.status(401).json({ message: "You can't access" });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized test" });
    }
  } else {
    console.log("no token");
    res.status(401).json({ message: "Unauthorized, No token" });
  }
};

module.exports = adminProtected;
