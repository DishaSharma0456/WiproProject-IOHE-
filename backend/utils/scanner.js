

const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const PDFDocument = require("pdfkit");

// Parse alerts directly from the ZAP XML report
function parseAlertsFromXML(xmlContent) {
  const alerts = [];
  const regex = /<alertitem>[\s\S]*?<\/alertitem>/g;
  const items = xmlContent.match(regex);

  if (items) {
    items.forEach((item) => {
      const getTag = (tag) => {
        const match = item.match(new RegExp(`<${tag}>(.*?)</${tag}>`, "s"));
        return match ? match[1].trim() : "";
      };

      alerts.push({
        alert: getTag("alert"),
        risk: getTag("riskdesc"),
        description: getTag("desc"),
        solution: getTag("solution"),
      });
    });
  }

  return alerts;
}

// Generate PDF report from alerts
function generatePDF(alerts, pdfPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(20).text("OWASP ZAP Vulnerability Report", { align: "center" });
  doc.moveDown();

  if (alerts.length > 0) {
    alerts.forEach((alert, idx) => {
      doc
        .fontSize(14)
        .text(`${idx + 1}. ${alert.alert}`, { underline: true });

      doc
        .fontSize(12)
        .text(`Risk: ${alert.risk}`)
        .text(`Description: ${alert.description || "N/A"}`)
        .text(`Solution: ${alert.solution || "N/A"}`)
        .moveDown();
    });
  } else {
    doc.fontSize(12).text("No vulnerabilities were found.");
  }

  doc.fontSize(10).text(`Report generated on: ${new Date().toLocaleString()}`, {
    align: "right",
  });
  doc.end();
}

// Run ZAP scan using command-line and process result
function runZAPScan(url) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const reportPath = path.resolve(__dirname, `../reports/zap-${timestamp}.xml`);
    const pdfPath = path.resolve(__dirname, `../reports/zap-${timestamp}.pdf`);

    const isWindows = os.platform() === "win32";
    const zapCommand = isWindows ? `"C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat"` : "./zap.sh";

    const command = `${zapCommand} -cmd -addonupdate -quickurl ${url} -quickout "${reportPath}" -quickprogress -addoninstall pscanrulesAlpha`;

    console.log("Starting ZAP scan...");

    exec(command, {
      cwd: isWindows ? "C:\\Program Files\\ZAP\\Zed Attack Proxy" : undefined,
      timeout: 180000,
    }, (error, stdout, stderr) => {
      if (error) {
        return reject(`ZAP scan failed: ${stderr}`);
      }

      fs.readFile(reportPath, "utf8", (err, data) => {
        if (err) return reject("Failed to read ZAP report XML: " + err.message);

        const alerts = parseAlertsFromXML(data);
        generatePDF(alerts, pdfPath);

        resolve({
          tool: "OWASP ZAP",
          pdfReport: pdfPath,
          rawResults: alerts,
        });
      });
    });
  });
}

module.exports = { runZAPScan };

