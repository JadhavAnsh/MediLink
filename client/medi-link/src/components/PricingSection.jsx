import { creditBenefits } from "@/lib/data";
import { Stethoscope } from "lucide-react";
import { Badge } from "./ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";

export const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-500 text-emerald-700 dark:text-emerald-400 px-4 py-1 text-sm font-medium tracking-wide mb-4"
          >
            Affordable Healthcare
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Consultation Packages
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect consultation package that fits your healthcare
            needs.
          </p>
        </div>

        {/* Pricing Cards Grid (optional for later) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          // Pricing cards here
        </div> */}

        {/* Credit System Description */}
        <Card className="mt-12 bg-muted/30 border border-border shadow-md backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center text-foreground">
              <Stethoscope className="h-5 w-5 mr-2 text-emerald-500" />
              How Our Credit System Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {creditBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 bg-emerald-500/10 p-1.5 rounded-full">
                    <svg
                      className="h-4 w-4 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: benefit }}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
