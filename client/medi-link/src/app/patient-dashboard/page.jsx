"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PatientDashboard() {
  const router = useRouter();

  const [reports, setReports] = useState([
    { name: "Glucose", date: "02/11/2023" },
    { name: "Blood Count", date: "02/11/2023" },
    { name: "Full Body X-Ray", date: "02/11/2023" },
    { name: "Hepatitis Panel", date: "02/11/2023" },
    { name: "Calcium", date: "02/11/2023" },
  ]);

  const [appointments, setAppointments] = useState([
    {
      doctor: "James Carter",
      spec: "Cardiologist",
      date: "2/11/23",
      time: "4:50 PM",
      status: "Active",
    },
    {
      doctor: "Kelli Jener",
      spec: "Neurologist",
      date: "2/11/23",
      time: "4:50 PM",
      status: "Upcoming",
    },
    {
      doctor: "Mike Wise",
      spec: "Therapist",
      date: "2/11/23",
      time: "4:50 PM",
      status: "Completed",
    },
    {
      doctor: "Saim Peterson",
      spec: "Dentist",
      date: "2/11/23",
      time: "4:50 PM",
      status: "Completed",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/");
  };

  // ✅ Fix: Accept `item` as parameter
  const handleNavigation = (item) => {
    switch (item) {
      case "Overview":
        router.push("/patient-dashboard");
        break;
      case "Reports":
        router.push("/upload-report");
        break;
      case "Book Appointment":
        router.push("/list-doctors");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r p-6 shadow-md flex flex-col space-y-6">
        <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
          MediLink
        </div>
        <nav className="flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={() => handleNavigation("Overview")}
            className="w-full justify-start text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900"
          >
            Overview
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation("Reports")}
            className="w-full justify-start text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900"
          >
            Reports
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation("Book Appointment")}
            className="w-full justify-start text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900"
          >
            Book Appointment
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900"
          >
            Log out
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Good Morning, Ansh!</h1>
          <Image
            src="/avatar.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        {/* Appointments Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="py-2 px-3 text-left">Doctor</th>
                  <th className="py-2 px-3 text-left">Speciality</th>
                  <th className="py-2 px-3 text-left">Date</th>
                  <th className="py-2 px-3 text-left">Time</th>
                  <th className="py-2 px-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-2 px-3">{a.doctor}</td>
                    <td className="py-2 px-3">{a.spec}</td>
                    <td className="py-2 px-3">{a.date}</td>
                    <td className="py-2 px-3">{a.time}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          a.status === "Active"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : a.status === "Upcoming"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Reports & Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>My Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {reports.map((r, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b pb-1 last:border-none"
                  >
                    <span>{r.name}</span>
                    <span className="text-muted-foreground">{r.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border dark:border-gray-700"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
