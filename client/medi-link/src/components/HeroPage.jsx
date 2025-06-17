import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const HeroPage = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="bg-emerald-100 dark:bg-emerald-900/20 border-emerald-600 text-emerald-700 dark:text-emerald-400 px-4 py-1 text-sm tracking-wide"
            >
              Healthcare made simple
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Connect with doctors <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                anytime, anywhere
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              Book appointments, consult via video, and manage your healthcare
              journey — all in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                <Link href="/onboarding">Get Started</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-800/20 transition-colors"
              >
                <Link href="/list-doctors">Find Doctors</Link>
              </Button>
            </div>
          </div>

          {/* Right Image with enhanced shadow */}
          <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-emerald-500 blur-3xl opacity-20 z-0" />
            <Image
              src="/banner2.png"
              alt="Doctor consultation"
              fill
              priority
              className="object-cover object-center rounded-xl z-10 relative shadow-2xl drop-shadow-[0_10px_20px_rgba(16,185,129,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
