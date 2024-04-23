require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const taskRoutes = require("./routes/task");

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/task", taskRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
    console.log("Connected to DB!");
  })
  .catch((error) => {
    console.log(error);
  });
