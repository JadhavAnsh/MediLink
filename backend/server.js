const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes.js");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user.routes.js");
const appointmentRouter = require("./routes/appointment.routes.js");
const medicalReportRouter = require("./routes/medicalReport.routes.js");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONG_URL);
    console.log("MongoDB connected!, DataBase name: " + mongoose.connection.db.databaseName);

    // Middleware
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
      origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow requests from the client URL
      credentials: true, // Allow cookies to be sent with requests
    }));

    // Greeting route
    app.get("/api/v1/greeting", (req, res) => {
      res.send("Welcome to the medilink backend server!");
    });

    // Routes
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/appointments", appointmentRouter);
    app.use("/api/v1/medical-reports", medicalReportRouter);

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}


startServer();
