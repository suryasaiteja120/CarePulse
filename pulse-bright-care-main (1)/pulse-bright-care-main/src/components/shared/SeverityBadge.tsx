import { cn } from "@/lib/utils";

type Severity = "mild" | "moderate" | "severe";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityConfig = {
  mild: {
    label: "Mild",
    className: "severity-mild",
  },
  moderate: {
    label: "Moderate",
    className: "severity-moderate",
  },
  severe: {
    label: "Severe",
    className: "severity-severe",
  },
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
