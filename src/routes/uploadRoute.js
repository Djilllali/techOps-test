const uploadController = require("../controllers/uploadController");
const express = require("express");
const router = express.Router();
const multer = require("multer");

/**
 * Contrôleur de téléversement pour gérer les requêtes d'upload.
 * Configuration of the multer storage
 * Checking if a file was uploaded
 * @module uploadController
 */
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
    const result = await uploadController.processFile(req.file);
    res.status(200).json({ downloadLink: result });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
