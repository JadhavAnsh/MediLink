"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser, getUserName, getUserProfileImage } from "@/lib/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      getUser()
        .then(() => {
          setIsLoggedIn(true);
          setUserImage(getUserProfileImage());
          setUserName(getUserName());
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-all">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-single.png"
            alt="Medi-Link Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            Medi-Link
          </span>
        </Link>

        {/* Right Side: Auth Buttons or Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Image
                    src={userImage || "/default-user.png"}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="rounded-full h-10 w-10 object-cover border border-gray-300 dark:border-gray-700"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <DropdownMenuLabel>{userName || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">👤 Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  🔓 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                className="bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-500"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Link href="/log-in">Log In</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
