"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // optional utility for conditional classes

const goals = [
  {
    label: "Book Appointment",
    description: "Schedule a consultation with a specialist",
  },
  {
    label: "Ask a Doctor",
    description: "Get advice from a certified doctor",
  },
  {
    label: "Get Second Opinion",
    description: "Review an existing diagnosis or treatment",
  },
];

export default function OnboardingPage() {
  const handleGoalSelection = (goal) => {
    console.log("Selected goal:", goal);
  };

  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge
            variant="outline"
            className="bg-emerald-100 dark:bg-emerald-900/20 border-emerald-600 text-emerald-700 dark:text-emerald-400 px-4 py-1 text-sm tracking-wide"
          >
            Choose Your Goal
          </Badge>

          <CardTitle className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
            What would you like to do <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              today?
            </span>
          </CardTitle>
        </div>

        {/* Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card
              key={goal.label}
              role="button"
              aria-label={`Select goal: ${goal.label}`}
              onClick={() => handleGoalSelection(goal.label)}
              className={cn(
                "group cursor-pointer border border-muted shadow-sm hover:border-emerald-600 hover:shadow-lg transition-all p-6 bg-background rounded-xl",
                "flex flex-col items-center text-center hover:bg-emerald-50 dark:hover:bg-emerald-800/10"
              )}
            >
              <p className="text-lg font-semibold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 mb-1 transition-colors">
                {goal.label}
              </p>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
