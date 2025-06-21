// lib/api/medical.js
import axios from "axios";

export const uploadMedicalReport = async ({ file, patientId, doctorId, extractedText }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", patientId);
    formData.append("doctorId", doctorId);
    if (extractedText) {
      formData.append("extractedText", extractedText);
    } else {
      console.log("No extracted text provided, skipping this field.");
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}medical-reports/upload-report`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (!res.data?.data?.url) {
      throw new Error("Upload failed: No URL returned.");
    }

    return res.data.data; // contains: { url, fileId, report }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Upload failed.");
  }
};
