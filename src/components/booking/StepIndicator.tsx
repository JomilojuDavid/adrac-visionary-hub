import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { num: 1, label: "Select Room" },
  { num: 2, label: "Verify ID" },
  { num: 3, label: "Guest Details" },
  { num: 4, label: "Review & Pay" },
];

const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-0 mb-10 flex-wrap">
    {steps.map((s, i) => (
      <div key={s.num} className="flex items-center">
        <div className="flex flex-col items-center gap-1.5">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-colors",
              current > s.num
                ? "bg-gold text-gold-foreground"
                : current === s.num
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {current > s.num ? <Check className="w-4 h-4" /> : s.num}
          </div>
          <span className={cn("text-xs font-medium text-center", current >= s.num ? "text-foreground" : "text-muted-foreground")}>
            {s.label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={cn("w-10 md:w-20 h-0.5 mx-2 mb-5", current > s.num ? "bg-gold" : "bg-border")} />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
