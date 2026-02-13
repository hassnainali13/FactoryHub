const multer = require("multer");

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // File name format
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
