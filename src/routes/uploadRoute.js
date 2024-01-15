// src/routes/uploadRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Configuration of the multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Checking if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Checking if the uploaded file is a CSV
    if (req.file.mimetype !== "text/csv") {
      return res
        .status(400)
        .json({ error: "Invalid file format. Please upload a CSV file." });
    }

    res.status(200).json({ downloadLink: "successs" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
