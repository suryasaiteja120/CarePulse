import { Link } from "react-router-dom";
import { 
  Brain, 
  Shield, 
  Calendar, 
  Activity, 
  TrendingUp, 
  Heart,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthcareCard } from "@/components/shared/HealthcareCard";

export default function Dashboard() {
  const features = [
    {
      title: "AI Symptom Analysis",
      description: "Get instant insights about your symptoms using advanced AI technology. Our system analyzes patterns and provides personalized recommendations.",
      icon: Brain,
      iconColor: "primary" as const,
      link: "/symptom-checker",
    },
    {
      title: "Preventive Care Guidance",
      description: "Receive proactive health recommendations based on your history and lifestyle to prevent potential health issues before they arise.",
      icon: Shield,
      iconColor: "secondary" as const,
      link: "/health-report",
    },
    {
      title: "Appointment Scheduling",
      description: "Easily schedule and manage your medical appointments. Get reminders and keep track of your healthcare journey.",
      icon: Calendar,
      iconColor: "primary" as const,
      link: "/calendar",
    },
  ];

  const stats = [
    { label: "Health Score", value: "87%", icon: Heart, color: "text-severity-mild" },
    { label: "Checkups Done", value: "12", icon: Activity, color: "text-secondary" },
    { label: "Health Trend", value: "+5%", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 animate-fade-in">
        <div className="gradient-hero rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Healthcare</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome to <span className="text-gradient">CarePulse</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Your AI Health Companion — Get instant symptom analysis, preventive care insights, 
              and personalized health recommendations all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/symptom-checker">
                <Button variant="hero" size="lg" className="gap-2">
                  Start Symptom Check
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/health-report">
                <Button variant="outline" size="lg">
                  View Health Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="card-healthcare p-6 flex items-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-3 rounded-xl bg-accent">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link key={feature.title} to={feature.link}>
              <HealthcareCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                iconColor={feature.iconColor}
                delay={index * 100 + 300}
              >
                <div className="flex items-center gap-2 text-primary font-medium text-sm mt-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </div>
              </HealthcareCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="card-healthcare p-6 border-l-4 border-l-secondary opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Important:</strong> CarePulse provides AI-powered health insights for informational purposes only. 
          It does not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
        </p>
      </div>
    </div>
  );
}
