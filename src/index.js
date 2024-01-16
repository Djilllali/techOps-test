const express = require("express");
const http = require("http");
const uploadRoute = require("./routes/uploadRoute");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Enable CORS for Express routes
app.use(cors());

const uploadsPath = path.join(__dirname, "uploads");

// Check if uploads directory exists and create it if not
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// Route for file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Route for file uploads
app.use("/api", uploadRoute);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
