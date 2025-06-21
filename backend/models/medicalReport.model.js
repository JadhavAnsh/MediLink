const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalReportSchema = new Schema({
  reportId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    default: "", // optional but helps prevent `undefined` issues
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MedicalReport", medicalReportSchema);
