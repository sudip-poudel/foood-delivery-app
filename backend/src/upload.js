const multer = require("multer");
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).array("testImage", 2);
const upload2 = multer({
  storage: Storage,
}).single("testImage");

module.exports = { upload, upload2 };
