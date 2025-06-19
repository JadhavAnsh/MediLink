"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadReportPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadedUrl(null);
    setShowPreview(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("patientId", process.env.PATIENT_ID); // Temprorary patient ID
    formData.append("doctorId", process.env.DOCTOR_ID); // Temporary doctor ID

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}medical-reports/upload-report`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const url = res.data?.data?.url;

      if (url) {
        console.log("Uploaded URL:", url);
        setUploadedUrl(url);
        setShowPreview(false);
        toast.success("Report uploaded successfully!");
      } else {
        toast.error("Upload failed: No URL returned.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const isImage = (url) => /\.(jpeg|jpg|png|webp|gif)$/i.test(url);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-background text-foreground">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Upload Medical Report
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />

          <Button onClick={handleUpload} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Report"
            )}
          </Button>

          {uploadedUrl && (
            <div className="flex items-center justify-between gap-4 border rounded p-3 mt-4">
              <span className="text-sm truncate max-w-[60%] text-muted-foreground">
                {uploadedUrl.split("/").pop()}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          )}

          {showPreview && uploadedUrl && (
            <div className="pt-4">
              <div className="border rounded-md overflow-hidden shadow-sm w-full h-[400px] bg-muted flex items-center justify-center">
                <img
                  src={uploadedUrl}
                  alt="Uploaded Report"
                  className="object-contain h-full w-full"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
