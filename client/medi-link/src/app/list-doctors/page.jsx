"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

const dummyDoctors = [
  {
    id: 1,
    name: "Dr. Priya Mehta",
    specialty: "Cardiologist",
    image: "/logIn-banner.png",
    hospital: "Apollo Hospitals",
  },
  {
    id: 2,
    name: "Dr. Rajesh Shah",
    specialty: "Dermatologist",
    image: "/logIn-banner.png",
    hospital: "Fortis Healthcare",
  },
  {
    id: 3,
    name: "Dr. Ananya Gupta",
    specialty: "Pediatrician",
    image: "/logIn-banner.png",
    hospital: "Cloudnine",
  },
  {
    id: 4,
    name: "Dr. Arjun Desai",
    specialty: "Orthopedic",
    image: "/logIn-banner.png",
    hospital: "Hiranandani Hospital",
  },
];

export default function DoctorListPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = [
    "All",
    ...new Set(dummyDoctors.map((doc) => doc.specialty)),
  ];

  const filteredDoctors =
    selectedSpecialty === "All"
      ? dummyDoctors
      : dummyDoctors.filter((doc) => doc.specialty === selectedSpecialty);

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-gray-950 transition-colors">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
        Find Your <span className="text-emerald-600">Doctor</span>
      </h1>

      {/* Specialty Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {specialties.map((spec) => (
          <Button
            key={spec}
            variant="outline"
            className={`capitalize text-sm border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 
        ${selectedSpecialty === spec ? "ring-2 ring-emerald-500" : ""}
      `}
            onClick={() => setSelectedSpecialty(spec)}
          >
            {spec}
          </Button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="overflow-hidden rounded-xl border border-muted bg-background text-foreground shadow-md hover:shadow-xl hover:scale-[1.01] transition-transform duration-300"
          >
            {/* Image Header */}
            <div className="relative h-fit w-full aspect-[4/3]">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 rounded-t-xl" />
            </div>

            {/* Content */}
            <CardContent className="p-2">
              <CardTitle className="text-lg font-semibold">
                {doctor.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {doctor.specialty}
              </p>
              <p className="text-sm text-muted-foreground">{doctor.hospital}</p>

              <div className="mt-2 flex flex-col gap-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 w-full"
                >
                  View Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-800/20 w-full"
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
