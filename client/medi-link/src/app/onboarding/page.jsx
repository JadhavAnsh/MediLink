"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SPECIALTIES } from "@/lib/specialities";
import { Stethoscope, User } from "lucide-react";
import { useState } from "react";
// import { SPECIALTIES } from "@/lib/specialities"; 

export default function OnboardingPageUI() {
  const [step, setStep] = useState("choose-role");

  // Role selection UI
  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="border-border bg-muted/30 hover:border-primary/40 cursor-pointer transition-all shadow-sm"
          onClick={() => setStep("patient-selected")}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground mb-2">
              Join as a Patient
            </CardTitle>
            <CardDescription className="mb-4 text-muted-foreground">
              Book appointments, consult with doctors, and manage your
              healthcare journey
            </CardDescription>
            <Button className="w-full mt-2" variant="default">
              Continue as Patient
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-border bg-muted/30 hover:border-primary/40 cursor-pointer transition-all shadow-sm"
          onClick={() => setStep("doctor-form")}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground mb-2">
              Join as a Doctor
            </CardTitle>
            <CardDescription className="mb-4 text-muted-foreground">
              Create your professional profile, set your availability, and
              provide consultations
            </CardDescription>
            <Button className="w-full mt-2" variant="default">
              Continue as Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Doctor form UI
  if (step === "doctor-form") {
    return (
      <Card className="border-border bg-muted/30 shadow-sm">
        <CardContent className="pt-6">
          <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              Complete Your Doctor Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Please provide your professional details for verification
            </CardDescription>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="specialty">Medical Specialty</Label>
              <Select>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((spec) => (
                    <SelectItem
                      key={spec.name}
                      value={spec.name}
                      className="flex items-center gap-2"
                    >
                      <span className="text-primary">{spec.icon}</span>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g. 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Link to Credential Document</Label>
              <Input
                id="credentialUrl"
                type="url"
                placeholder="https://example.com/my-medical-degree.pdf"
              />
              <p className="text-sm text-muted-foreground">
                Please provide a link to your medical degree or certification
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Your Services</Label>
              <Textarea
                id="description"
                placeholder="Describe your expertise, services, and approach to patient care..."
                rows={4}
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("choose-role")}
              >
                Back
              </Button>
              <Button type="submit" variant="default">
                Submit for Verification
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
