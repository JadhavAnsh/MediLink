import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-all">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Title */}
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

        {/* Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            asChild
            className="bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Link href="/log-in">Log In</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
