

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { runZAPScan } = require("../utils/scanner"); // adjust path if needed

// POST /api/scan - Runs ZAP scan
router.post("/scan", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required." });

  try {
    const { pdfReport, vulnerabilities } = await runZAPScan(url);
    const fileName = path.basename(pdfReport);

    res.json({
      success: true,
      message: "Scan completed",
      vulnerabilities,
      reportPath: `/api/scan/reports/${fileName}`, // <-- Frontend will use this to download
    });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Scan failed: " + err });
  }
});

// GET /api/scan/reports/:filename - Serves the PDF
router.get("/reports/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../reports", fileName); // Make sure this matches where the file is saved

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  } else {
    res.status(404).send("Report not found.");
  }
});

module.exports = router;
