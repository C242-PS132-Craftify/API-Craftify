const { db } = require("../config/firebaseConfig");
const admin = require("firebase-admin");

exports.getAllBlogs = async (req, res) => {
  try {
    const snapshot = await db.collection("blog").get();
    if (snapshot.empty) {
      return res.status(404).json({ error: "No blog posts found" });
    }
    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

exports.createBlog = async (req, res) => {
  const { title, author, content, header_image } = req.body;

  if (!title || !author || !content || !header_image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof content !== "string" ||
    typeof header_image !== "string"
  ) {
    return res.status(400).json({ error: "All fields must be strings" });
  }

  try {
    const newBlog = {
      title,
      author,
      content,
      header_image,
      createdAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection("blog").add(newBlog);
    res.status(201).json({ id: docRef.id, ...newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

exports.getBlogById = async (req, res) => {
  const blogId = req.params.id;

  console.log(`Fetching blog post with ID: ${blogId}`);

  try {
    const doc = await db.collection("blog").doc(blogId).get();

    if (!doc.exists) {
      console.log(`Blog post with ID ${blogId} not found.`);
      return res.status(404).json({ error: "Blog post not found" });
    }

    console.log("Fetched blog post data:", doc.data());

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(`Error fetching blog post with ID ${blogId}:`, error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const docRef = db.collection("blog").doc(blogId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await docRef.update(req.body);
    res.status(200).json({ id: blogId, ...req.body });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const docRef = db.collection("blog").doc(blogId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await docRef.delete();
    res.status(200).json({ message: `Blog post with ID ${blogId} deleted.` });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};
