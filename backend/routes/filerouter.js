const express = require("express");
const router = express.Router();
const MealItem = require("../models/MealItems");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images");
  },
  filename(req, file, cb) {
    cb(
      null,
      `image_${Date.now()}${file.originalname.trim(" ")}` +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
router.post("/uploadimage", upload.single("file"), (req, res) => {
  const file = req.file;
  const meta = req.body;
});
module.exports = router;
