const { storage, ID } = require("../helpers/appwrite");
const MedicalReport = require("../models/medicalReport.model");
require("dotenv").config();

const UploadMedicalReport = async (req, res) => {
  try {
    const file = req.file;
    const patientId = req.body.patientId;
    const doctorId = req.body.doctorId;

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
    const reports = await MedicalReport.find({ patientId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  UploadMedicalReport,
  GetMedicalReportByUserId,
};
