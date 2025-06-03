"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SignUpPage() {
  const [role, setRole] = useState("Patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          <form className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
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
                placeholder="30"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-white">
                Address
              </Label>
              <Input
                id="address"
                placeholder="123 Street, City"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white"
              />
            </div>

            {/* Profile Image */}
            <div>
              <Label htmlFor="profile" className="text-white">
                Profile Image
              </Label>
              <Input
                id="profile"
                type="file"
                accept="image/*"
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white rounded-md w-full px-3 py-2 pr-10"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            {/* Specialization - Only if Doctor */}
            {role === "Doctor" && (
              <div>
                <Label htmlFor="specialization" className="text-white">
                  Specialization
                </Label>
                <Input
                  id="specialization"
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
                placeholder="••••••••"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="mt-2 bg-[#1f1f1f] border border-[#333] text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-9 right-3 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-lg mt-2"
            >
              Create Account
            </Button>
          </form>
        </div>

        {/* Right: Image Section */}
        <div className="hidden md:block md:w-1/2 relative h-[100%] min-h-[640px]">
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
