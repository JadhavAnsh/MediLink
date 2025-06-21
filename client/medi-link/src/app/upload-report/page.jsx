"use client";

import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { uploadMedicalReport } from "@/lib/medical";
import Tesseract from "tesseract.js";

export default function UploadReportPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedUrl(null);
    setShowPreview(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setLoading(true);
      toast.info("Extracting text from image...");

      // 🧠 Extract text without mutating original file
      const {
        data: { text: extractedText },
      } = await Tesseract.recognize(selectedFile, "eng");

      toast.success("Text extracted successfully!");

      // ✅ Upload using original file
      const data = await uploadMedicalReport({
        file: selectedFile,
        patientId: "684eecac41cef6708c7e2b7a",
        doctorId: "6851afc9cfb869d9a2516199",
        extractedText: extractedText,
      });

      setUploadedUrl(data.url);
      toast.success("Report uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

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
