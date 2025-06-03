import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/logo-single.png"
            alt="Medi-Link Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
          <span className="pl-2 text-xl font-semibold justify-center text-gray-800 dark:text-gray-200">
            Medi-Link
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            asChild
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-emerald-700/20 hover:bg-muted/80"
          >
            <Link href="/log-in">Log In</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
