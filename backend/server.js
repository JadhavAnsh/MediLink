const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes.js");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

function startServer() {
  try {
    // Connect to MongoDB
    mongoose.connect(process.env.MONG_URL).then(() => {
      console.log(
        "MongoDB connected!, DataBase name: " +
          mongoose.connection.db.databaseName
      );
    })
    // Middleware
    .then(() => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
    })
    // Routes

    // Greeting route endpoint
    .then(() => {
        app.get("/api/v1/greeting", (req, res) => {
          res.send("Welcome to the medilink backend server!");
        });
    })

    // Authentication routes
    .then(() => {
      app.use("/api/v1/auth", authRouter);
    })
    // Start the server
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

startServer();
