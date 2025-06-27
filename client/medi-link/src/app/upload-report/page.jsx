"use client";

import { Eye, FileText, Loader2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Tesseract from "tesseract.js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMedicalReportsByUserId, uploadMedicalReport } from "@/lib/medical";

export default function MedicalReportPage() {
  const [selectedTab, setSelectedTab] = useState("view");
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const patientId = "684eecac41cef6708c7e2b7a"; // replace with dynamic ID if needed
  const doctorId = "6851afc9cfb869d9a2516199";

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      const data = await getMedicalReportsByUserId(patientId);
      setReports(data);
      console.log(data);
    } catch (err) {
      toast.error("Failed to load reports.");
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (selectedTab === "view") {
      fetchReports();
    }
  }, [selectedTab]);

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
      setUploading(true);
      toast.info("Extracting text from image...");

      const {
        data: { text: extractedText },
      } = await Tesseract.recognize(selectedFile, "eng");

      toast.success("Text extracted successfully!");

      const data = await uploadMedicalReport({
        file: selectedFile,
        patientId,
        doctorId,
        extractedText,
      });

      setUploadedUrl(data.url);
      toast.success("Report uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted p-4 space-y-4">
        <Button
          variant={selectedTab === "view" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setSelectedTab("view")}
        >
          <FileText className="mr-2 h-4 w-4" />
          View Reports
        </Button>
        <Button
          variant={selectedTab === "upload" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setSelectedTab("upload")}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Report
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-background text-foreground">
        {selectedTab === "view" ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Uploaded Reports</h2>
            {loadingReports ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin w-6 h-6" />
              </div>
            ) : reports.length === 0 ? (
              <p className="text-muted-foreground">No reports uploaded yet.</p>
            ) : (
              <div className="grid gap-4">
                {reports.map((report) => (
                  <Card key={report._id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="truncate max-w-sm">
                        <p className="font-medium">{report.reportName}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded:{" "}
                          {report.CreatedAt
                            ? new Date(report.CreatedAt).toLocaleString(
                                "en-IN",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                  timeZone: "Asia/Kolkata",
                                }
                              )
                            : "Unknown"}
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.open(report.fileUrl, "_blank")}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Upload Medical Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />

                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full"
                >
                  {uploading ? (
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
        )}
      </div>
    </div>
  );
}
