require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const sectionRoutes = require("./routes/section");
const taskRoutes = require("./routes/task");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "Origin",
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Source-Url",
  ],
  optionsSuccessStatus: 204,
};
// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sectionRoutes);
app.use(taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.mongodb_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
