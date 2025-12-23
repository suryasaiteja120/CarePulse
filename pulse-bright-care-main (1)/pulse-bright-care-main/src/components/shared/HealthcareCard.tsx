import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthcareCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: "primary" | "secondary" | "mild" | "moderate" | "severe";
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const iconColorClasses = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  mild: "bg-severity-mild/10 text-severity-mild",
  moderate: "bg-severity-moderate/10 text-severity-moderate",
  severe: "bg-severity-severe/10 text-severity-severe",
};

export function HealthcareCard({
  title,
  description,
  icon: Icon,
  iconColor = "primary",
  children,
  className,
  onClick,
  delay = 0,
}: HealthcareCardProps) {
  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "card-healthcare p-6 opacity-0 animate-fade-in-up",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl", iconColorClasses[iconColor])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}
