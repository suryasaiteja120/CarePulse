import { Heart, Shield, Brain, Users, CheckCircle, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze your symptoms and provide personalized health insights.",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description: "Proactive health recommendations to help you prevent potential health issues before they arise.",
  },
  {
    icon: Users,
    title: "Accessible Healthcare",
    description: "Making quality health guidance accessible to everyone, anywhere, anytime.",
  },
];

const roadmap = [
  { title: "Backend Integration", description: "Connect forms to Flask REST APIs for secure data handling" },
  { title: "Authentication", description: "JWT-based user authentication with secure token storage" },
  { title: "AI Integration", description: "Connect symptom checker to AI/ML backend for real-time analysis" },
  { title: "Database Integration", description: "PostgreSQL for health reports and appointment data" },
  { title: "Deployment", description: "Frontend on Netlify/AWS S3, Backend on Render/AWS EC2" },
  { title: "Future: Doctor Recommendations", description: "AI-powered doctor matching system" },
  { title: "Future: Health Trend Charts", description: "Visual analytics for health patterns" },
  { title: "Future: Mobile App", description: "Native mobile application for iOS and Android" },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-card">
          <Heart className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          About <span className="text-gradient">CarePulse</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your AI Health Companion — Using artificial intelligence for preventive and accessible healthcare.
        </p>
      </div>

      {/* Mission */}
      <div className="card-healthcare p-8 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          CarePulse is dedicated to democratizing healthcare through the power of artificial intelligence. 
          We believe everyone deserves access to quality health guidance, regardless of their location or 
          circumstances. Our platform combines cutting-edge AI technology with medical expertise to provide 
          personalized health insights, preventive care recommendations, and seamless appointment management.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="card-healthcare p-6 text-center opacity-0 animate-fade-in"
            style={{ animationDelay: `${(index + 2) * 100}ms` }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Ethical Disclaimer */}
      <div className="bg-severity-moderate/10 border-2 border-severity-moderate/30 rounded-2xl p-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-severity-moderate/20">
            <AlertTriangle className="w-6 h-6 text-severity-moderate" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Important Disclaimer</h3>
            <p className="text-muted-foreground">
              <strong>CarePulse does not provide medical diagnosis or prescriptions.</strong> The information 
              and recommendations provided by our AI system are for informational and educational purposes only. 
              They should not be considered as a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions you 
              may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>

      {/* Development Roadmap */}
      <div className="card-healthcare p-8 opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
        <h2 className="text-2xl font-bold text-foreground mb-6">Development Roadmap</h2>
        <p className="text-muted-foreground mb-6">
          CarePulse is currently a frontend prototype. Here's our planned development roadmap:
        </p>
        <div className="space-y-4">
          {roadmap.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <div className="p-1 rounded-full bg-primary/10 mt-0.5">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Note */}
      <div className="mt-8 p-6 bg-muted/30 rounded-2xl border border-border text-center">
        <p className="text-muted-foreground">
          <strong>Tech Stack:</strong> React + TypeScript + Tailwind CSS
          <br />
          <span className="text-sm">
            Backend: Flask REST API (planned) | Database: PostgreSQL (planned) | AI: Custom ML Models (planned)
          </span>
        </p>
      </div>
    </div>
  );
}
