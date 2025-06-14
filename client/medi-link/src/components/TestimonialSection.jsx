import { testimonials } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export const TestimonialSection = () => {
  return (
    <section className="py-20 bg-muted/30 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-500 text-emerald-700 dark:text-emerald-400 px-4 py-1 text-sm font-medium tracking-wide mb-4"
          >
            Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from patients and doctors who use our platform
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-transparent hover:border-emerald-600/40 shadow-md hover:shadow-emerald-300/20 dark:hover:shadow-emerald-900/40 bg-card rounded-xl transition-all duration-300 group"
            >
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4 transform group-hover:scale-105 transition-transform">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  “{testimonial.quote}”
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
