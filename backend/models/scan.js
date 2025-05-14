const mongoose = require("mongoose");

// Sub-schema for vulnerabilities
const vulnerabilitySchema = new mongoose.Schema({
  type: {
    type: String, // e.g., "XSS", "SQL Injection"
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
});

// Main scan schema
const scanSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending","in-progress", "completed", "failed"],
    default: "pending",
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  vulnerabilities: [vulnerabilitySchema], // Embedded array of vulnerabilities
  reportUrl: {
    type: String, // PDF file path
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Scan", scanSchema);