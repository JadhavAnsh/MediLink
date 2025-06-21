const express = require("express");
const multer = require("multer");
const { GetMedicalReportByUserId, UploadMedicalReport } = require("../controllers/medicalReport.controller");
const upload = multer({ storage: multer.memoryStorage() }); 
const medicalReportRouter = express.Router();

medicalReportRouter.get("/:patientId", GetMedicalReportByUserId);

medicalReportRouter.post("/upload-report", upload.single("file"), UploadMedicalReport);

module.exports = medicalReportRouter;