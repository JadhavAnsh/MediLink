import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";

export const FeatureSection = () => {
  return (
    <section className="py-20 bg-muted/30 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform makes healthcare accessible with just a few clicks.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border border-transparent hover:border-emerald-600/40 shadow-md hover:shadow-emerald-200/20 dark:hover:shadow-emerald-900/40 rounded-xl transition-all duration-300 group"
            >
              <CardHeader className="pb-2">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-lg w-fit mb-4 transition-transform duration-300 group-hover:scale-105">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
