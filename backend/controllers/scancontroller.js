

const Scan = require("../models/Scan.js");

// 1. Create a new scan (initial entry, status: pending)
exports.createScan = async (req, res) => {
  const { url } = req.body;

  try {
    const newScan = new Scan({ url });
    await newScan.save();

    res.status(201).json({
      message: "Scan started!",
      scan: newScan,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create scan" });
  }
};

// 2. Get all scans (for dashboard or history)
exports.getAllScans = async (req, res) => {
  try {
    const scans = await Scan.find().sort({ startedAt: -1 });
    res.status(200).json(scans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scans" });
  }
};

// 3. Get scan by ID (to view full details of a specific scan)
exports.getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) {
      return res.status(404).json({ error: "Scan not found" });
    }
    res.status(200).json(scan);
  } catch (error) {
    res.status(500).json({ error: "Error fetching scan" });
  }
};

