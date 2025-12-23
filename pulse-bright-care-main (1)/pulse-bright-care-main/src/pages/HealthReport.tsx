import { FileText, Calendar, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "@/components/shared/SeverityBadge";

// Mock health report data - TODO: Database integration
// Fetch from PostgreSQL via /api/reports endpoint
const mockReports = [
  {
    id: 1,
    date: "2024-01-15",
    category: "Respiratory",
    severity: "mild" as const,
    symptoms: "Mild cough and congestion",
    advice: "Rest, stay hydrated, and monitor symptoms for 48 hours.",
  },
  {
    id: 2,
    date: "2024-01-10",
    category: "General",
    severity: "mild" as const,
    symptoms: "Mild headache and fatigue",
    advice: "Ensure adequate sleep and reduce screen time.",
  },
  {
    id: 3,
    date: "2024-01-05",
    category: "Digestive",
    severity: "moderate" as const,
    symptoms: "Stomach discomfort after meals",
    advice: "Consider dietary changes and consult a gastroenterologist if persists.",
  },
  {
    id: 4,
    date: "2023-12-28",
    category: "Mental Health",
    severity: "moderate" as const,
    symptoms: "Increased stress and anxiety",
    advice: "Practice relaxation techniques and consider speaking with a counselor.",
  },
  {
    id: 5,
    date: "2023-12-20",
    category: "Cardiac",
    severity: "severe" as const,
    symptoms: "Occasional chest discomfort",
    advice: "Immediate consultation with a cardiologist recommended.",
  },
];

export default function HealthReport() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Health Report</h1>
              <p className="text-muted-foreground">Your symptom check history</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Checks", value: "12", color: "text-primary" },
          { label: "Mild Cases", value: "8", color: "text-severity-mild" },
          { label: "Moderate Cases", value: "3", color: "text-severity-moderate" },
          { label: "Severe Cases", value: "1", color: "text-severity-severe" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="card-healthcare p-4 text-center opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {mockReports.map((report, index) => (
          <div
            key={report.id}
            className="card-healthcare p-6 opacity-0 animate-fade-in"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Date & Category */}
              <div className="flex items-center gap-4 lg:w-48">
                <div className="p-2 rounded-lg bg-muted">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {new Date(report.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">{report.category}</p>
                </div>
              </div>

              {/* Severity */}
              <div className="lg:w-32">
                <SeverityBadge severity={report.severity} />
              </div>

              {/* Symptoms & Advice */}
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">{report.symptoms}</p>
                <p className="text-sm text-muted-foreground">{report.advice}</p>
              </div>

              {/* View Details */}
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Note */}
      <div className="mt-8 p-6 bg-muted/30 rounded-2xl border border-border text-center">
        <p className="text-muted-foreground">
          Your health report data will be stored securely once the database integration is complete.
          <br />
          <span className="text-sm">
            {/* TODO: Database Integration - Connect to PostgreSQL for persistent storage */}
          </span>
        </p>
      </div>
    </div>
  );
}
