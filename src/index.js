const express = require("express");
const http = require("http");
const uploadRoute = require("./routes/uploadRoute");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Enable CORS for Express routes
app.use(cors());

// Route for file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Route for file uploads
app.use("/api", uploadRoute);

// WebSocket for real-time progress updates
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Send a keep-alive message at regular intervals
  const interval = setInterval(() => {
    socket.emit("keep-alive", { message: "Still connected" });
  }, 5000);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    clearInterval(interval);
  });
});

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
