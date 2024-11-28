const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./keys/bucket-upload-key.json",
});

const scanBucketName = "item-uploaded-bucket";
const blogBucketName = "craftify-blog-bucket";

const uploadScanImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const uniqueFilename = `${Date.now()}-${req.file.originalname.replace(
      /\s+/g,
      "_"
    )}`;
    const bucket = storage.bucket(scanBucketName);
    const blob = bucket.file(uniqueFilename);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      return res.status(500).send("Error uploading file: " + err.message);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${scanBucketName}/${blob.name}`;
      return res.status(200).send({
        message: "File uploaded successfully",
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    return res.status(500).send("Error uploading file: " + err.message);
  }
};

const uploadBlogImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const uniqueFilename = req.file.originalname.replace(/\s+/g, "_");
    const bucket = storage.bucket(blogBucketName);
    const blob = bucket.file(uniqueFilename);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      return res.status(500).send("Error uploading file: " + err.message);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${blogBucketName}/${blob.name}`;
      return res.status(200).send({
        message: "File uploaded successfully",
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    return res.status(500).send("Error uploading file: " + err.message);
  }
};

module.exports = { uploadScanImage, uploadBlogImage };
