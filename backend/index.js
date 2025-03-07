const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userProfileRoutes = require("./routes/userprofile.routes");
const moodLogRoutes = require("./routes/moodlog.routes");
const breathingExerciseRoutes = require("./routes/breathingexercise.routes");
const paymentroutes=require('./routes/payment.routes');

// Load environment variables before other imports
dotenv.config();

const sessionMiddleware = require("./middleware/session.middleware");
const authRoutes = require("./routes/auth.routes");
const fitnessRoutes = require("./routes/fitness.routes");
const userRoute = require("./routes/user.routes");

const app = express();

// Environment variables
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/odoo-hackathon";

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(sessionMiddleware);

// Database connection with error handling
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Routes
app.use("/api/user", userRoute);
app.use("/auth", authRoutes);
app.use("/api", fitnessRoutes);
app.use("/api/user-profiles", userProfileRoutes);
app.use("/api/mood-logs", moodLogRoutes);
app.use("/api/breathing-exercises", breathingExerciseRoutes);
app.use('/api',paymentroutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});
// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
};

startServer();