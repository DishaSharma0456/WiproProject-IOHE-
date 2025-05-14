const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  scanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scan",
    required: true,
  },
  pdfPath: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
