const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.post("/", blogController.createBlog);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/user/:user_id", blogController.getBlogsByUserId);

module.exports = router;
