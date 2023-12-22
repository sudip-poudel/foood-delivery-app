const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const userProtected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
      const user = await User.findById(decoded?.user.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized test" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized, No token" });
  }
};

module.exports = userProtected;
