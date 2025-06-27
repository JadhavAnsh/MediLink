const { storage, ID } = require("../helpers/appwrite");
const MedicalReport = require("../models/medicalReport.model");
const { Readable } = require("stream");
require("dotenv").config();

const UploadMedicalReport = async (req, res) => {
  try {
    const file = req.file;
    const patientId = req.body.patientId;
    const doctorId = req.body.doctorId;
    const extractedText = req.body.extractedText || "";

    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!doctorId || !patientId)
      return res.status(400).json({ error: "Missing doctorId or patientId" });

    const appwriteFile = new File(
      [file.buffer],
      file.originalname,
      { type: file.mimetype }
    );

    const result = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID, // ✅ use correct bucket ID from env
      ID.unique(),
      appwriteFile
    );

    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${result.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    const report = await MedicalReport.create({
      reportId: result.$id,
      patientId,
      doctorId,
      fileUrl,
      extractedText,
    });

    return res.status(201).json({
      success: true,
      data: {
        url: fileUrl,
        fileId: result.$id,
        report,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Get Reports by Patient ID
const GetMedicalReportByUserId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Fetch reports from MongoDB sorted by newest first
    const reports = await MedicalReport.find({ patientId }).sort({ createdAt: -1 });

    // Each report already has fileUrl, return directly
    res.status(200).json({
      success: true,
      data: reports.map((report) => ({
        _id: report._id,
        patientId: report.patientId,
        doctorId: report.doctorId,
        fileUrl: report.fileUrl,
        extractedText: report.extractedText,
        CreatedAt: report.createdAt,
      })),
    });
    console.log("CreatedAt:", reports.map((r) => r.createdAt));
  } catch (err) {
    console.error("Error in getting report:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  UploadMedicalReport,
  GetMedicalReportByUserId,
};
