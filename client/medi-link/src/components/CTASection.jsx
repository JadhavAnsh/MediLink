import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-20 bg-muted/30 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative border border-emerald-300/40 dark:border-emerald-800/30 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="relative z-10 p-8 sm:p-10 lg:p-16 overflow-hidden bg-white dark:bg-emerald-950 transition-colors rounded-2xl">
            <div className="absolute inset-0 z-0">
              {/* Soft radial background blur in light mode */}
              <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-emerald-200 opacity-40 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-emerald-100 opacity-40 rounded-full blur-2xl"></div>

              {/* Optional subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50 to-white dark:from-emerald-900/30 dark:via-emerald-950/10 dark:to-black z-[-1]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to take control of your healthcare?
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
                Join{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  thousands
                </span>{" "}
                of users who have simplified their healthcare journey with our
                platform. Get started today and experience healthcare the way it
                should be.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Link href="/sign-up">Sign Up Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-800/10"
                >
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
