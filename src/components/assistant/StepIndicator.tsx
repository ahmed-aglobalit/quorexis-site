"use client";

interface StepIndicatorProps {
  current: number;
  total: number;
}

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < current;
        const isCurrent = step === current;

        return (
          <div key={step} className="flex items-center gap-1.5 flex-1">
            <div
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                isCompleted
                  ? "bg-accent"
                  : isCurrent
                    ? "bg-accent/50"
                    : "bg-foreground/10"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
