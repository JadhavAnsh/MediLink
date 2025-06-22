"use client";

import {
  getUser,
  getUserAge,
  getUserEmail,
  getUserGender,
  getUserName,
  getUserProfileImage,
  getUserSpecialization,
  updateUser,
} from "@/lib/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(""); // existing image from server
  const [newImage, setNewImage] = useState(""); // base64 image to be uploaded
  const [previewImage, setPreviewImage] = useState(""); // live preview
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    getUser().then((user) => {
      setName(getUserName());
      setEmail(getUserEmail());
      setRole(user.role);
      setProfileImage(getUserProfileImage());
      setAge(getUserAge());
      setGender(getUserGender());
      setSpecialization(getUserSpecialization());
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewImage(reader.result); // base64 string
        setPreviewImage(URL.createObjectURL(file)); // for preview
      };

      reader.readAsDataURL(file); // Convert to base64
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        name,
        email,
        profile: {
          age,
          gender,
          specialization,
          profile_img: newImage || profileImage, // send base64 or fallback
        },
      };

      const response = await updateUser(updatedUser);
      console.log("Profile updated:", response);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 bg-muted dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              {/* Profile Image */}
              <div className="relative">
                <Image
                  src={previewImage || profileImage || "/default-user.png"}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border border-gray-300 dark:border-gray-600 object-cover h-24 w-24"
                />
                <Label
                  htmlFor="profile-pic"
                  className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-1 cursor-pointer shadow-lg"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 13l6-6M4 21h16M4 21l4-4m12-12a2.828 2.828 0 010 4L13 19H9v-4l8-8z"
                    />
                  </svg>
                  <input
                    id="profile-pic"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Label>
              </div>

              {/* Form Fields */}
              <div className="w-full space-y-4 mt-6">
                <div>
                  <Label htmlFor="name" className="p-2 text-gray-700 dark:text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="p-2 text-gray-700 dark:text-gray-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="p-2 text-gray-700 dark:text-gray-200">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <Label htmlFor="gender" className="p-2 text-gray-700 dark:text-gray-200">
                    Gender
                  </Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full mt-1 border rounded-md px-3 py-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Show only if role === "doctor" */}
                {role === "doctor" && (
                  <div>
                    <Label htmlFor="specialization" className="p-2 text-gray-700 dark:text-gray-200">
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="Enter specialization"
                    />
                  </div>
                )}

                <Button
                  onClick={handleUpdate}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
