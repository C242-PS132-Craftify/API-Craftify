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
  const { title, author, content, header_image, user_id } = req.body; // Add user_id to destructuring

  // Check for required fields including user_id
  if (!title || !author || !content || !header_image || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validate that all fields are strings
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof content !== "string" ||
    typeof header_image !== "string" ||
    typeof user_id !== "string" // Validate user_id
  ) {
    return res.status(400).json({ error: "All fields must be strings" });
  }

  try {
    const newBlog = {
      title,
      author,
      content,
      header_image,
      user_id, // Include user_id in the new blog object
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

exports.getBlogsByUserId = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id parameter" });
  }

  try {
    const snapshot = await db
      .collection("blog")
      .where("user_id", "==", user_id)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No blog posts found for this user" });
    }

    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by user_id:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
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
