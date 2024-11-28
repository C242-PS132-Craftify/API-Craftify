const express = require("express");
const multer = require("multer");
const {
  uploadScanImage,
  uploadBlogImage,
} = require("../controllers/uploadController");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

router.post("/scan-image", upload.single("image"), uploadScanImage);
router.post("/blog-image", upload.single("image"), uploadBlogImage);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: err.message || "An error occurred!" });
  }
});

module.exports = router;
