"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient", // or "doctor"
    profile: {
      age: "",
      gender: "",
      address: "",
      specialization: "",
      profile_img: "",
    },
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    // For image input
    if (id === "profile_img" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            profile_img: reader.result,
          },
        }));
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    // Nested profile fields
    if (["age", "gender", "address", "specialization"].includes(id)) {
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [id]: value,
        },
      }));
    } else {
      // Top-level fields
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await signUp(formData);
      console.log("Signup success", res);
      router.push("/");
      toast.success('Signup successful! Please check your email to verify your account...');
    } catch (err) {
      console.error("Signup failed:", err.message);
      toast.error("Signup failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4 py-12 overflow-x-hidden">
      <div className="flex flex-col md:flex-row bg-[#161616] rounded-[22px] overflow-hidden shadow-2xl max-w-[1000px] w-full">
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-white text-3xl font-bold mb-2">
            Create your account
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Join Medi-Link today
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age" className="text-white">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.profile.age}
                onChange={handleChange}
                placeholder="30"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender" className="text-white">
                Gender
              </Label>
              <select
                id="gender"
                value={formData.profile.gender}
                onChange={handleChange}
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white rounded-md w-full px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-white">
                Address
              </Label>
              <Input
                id="address"
                value={formData.profile.address}
                onChange={handleChange}
                placeholder="123 Street, City"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            {/* Profile Image */}
            <div>
              <Label htmlFor="profile_img" className="text-white">
                Profile Image
              </Label>
              <Input
                id="profile_img"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-2 bg-[#1f1f1f] file:text-white text-white"
              />
            </div>

            {/* Role Selector */}
            <div>
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white rounded-md w-full px-3 py-2"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Specialization - Only if Doctor */}
            {formData.role === "doctor" && (
              <div>
                <Label htmlFor="specialization" className="text-white">
                  Specialization
                </Label>
                <Input
                  id="specialization"
                  value={formData.profile.specialization}
                  onChange={handleChange}
                  placeholder="e.g., Cardiologist"
                  className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
                />
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mt-4">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-10 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-lg mt-2"
            >
              Create Account
            </Button>

            {/* Log In link */}
            <p className="text-sm text-muted-foreground text-center mt-2">
              Already have an account?{" "}
              <Link
                href="/log-in"
                className="text-emerald-500 hover:underline hover:text-emerald-400"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Image Section */}
        <div className="hidden md:block md:w-1/2 relative min-h-[640px] h-full">
          <Image
            src="/signUp-banner.png"
            alt="Sign Up Illustration"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
