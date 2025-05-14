

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const scanRoutes = require("./routes/scanRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/reports', express.static('reports'));
app.use('/api/scan/reports', express.static(path.join(__dirname, 'reports')));
// File uploads served statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/zap_reports",express.static(path.join(__dirname,"zap_reports")));

// Routes
app.use("/api", scanRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });