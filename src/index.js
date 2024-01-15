const express = require('express');
const http = require('http');
const uploadRoute = require('./routes/uploadRoute');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

// Middleware for handling file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Route for file uploads
app.use('/api', uploadRoute);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
