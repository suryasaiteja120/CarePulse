import { AlertTriangle, Phone, MapPin, Heart, Activity, Brain, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const emergencySymptoms = [
  { icon: Heart, text: "Chest pain or pressure" },
  { icon: Brain, text: "Sudden severe headache" },
  { icon: Activity, text: "Difficulty breathing" },
  { icon: AlertCircle, text: "Signs of stroke (face drooping, arm weakness, speech difficulty)" },
  { icon: Heart, text: "Sudden numbness or weakness" },
  { icon: AlertTriangle, text: "Severe allergic reactions" },
  { icon: Activity, text: "Uncontrolled bleeding" },
  { icon: Brain, text: "Loss of consciousness" },
];

const emergencyContacts = [
  { name: "Emergency Services", number: "911", description: "For immediate life-threatening emergencies" },
  { name: "Poison Control", number: "1-800-222-1222", description: "For poisoning emergencies" },
  { name: "Mental Health Crisis", number: "988", description: "Suicide & Crisis Lifeline" },
];

export default function EmergencyHelp() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Emergency Alert Banner */}
      <div className="bg-severity-severe/10 border-2 border-severity-severe rounded-2xl p-6 md:p-8 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 rounded-2xl bg-severity-severe/20 animate-pulse-gentle">
            <AlertTriangle className="w-10 h-10 text-severity-severe" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-severity-severe mb-2">
              Emergency Help
            </h1>
            <p className="text-foreground text-lg">
              If you are experiencing a medical emergency, please call emergency services immediately.
            </p>
          </div>
          <a href="tel:911">
            <Button variant="severe" size="lg" className="gap-2 w-full md:w-auto">
              <Phone className="w-5 h-5" />
              Call 911
            </Button>
          </a>
        </div>
      </div>

      {/* When to Seek Help */}
      <div className="card-healthcare p-6 md:p-8 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-severity-severe/10">
            <AlertCircle className="w-5 h-5 text-severity-severe" />
          </div>
          Seek Immediate Medical Help If You Experience:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencySymptoms.map((symptom, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border"
            >
              <symptom.icon className="w-5 h-5 text-severity-severe flex-shrink-0" />
              <span className="text-foreground">{symptom.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card-healthcare p-6 md:p-8 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Phone className="w-5 h-5 text-secondary" />
          </div>
          Emergency Contacts
        </h2>
        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 border border-border"
            >
              <div>
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
              <a href={`tel:${contact.number}`}>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Phone className="w-4 h-4" />
                  {contact.number}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Nearest Hospital */}
      <div className="card-healthcare p-6 md:p-8 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          Find Nearest Hospital
        </h2>
        <p className="text-muted-foreground mb-4">
          Click below to find hospitals near your current location.
        </p>
        <a
          href="https://www.google.com/maps/search/hospital+near+me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            Find Hospitals Nearby
          </Button>
        </a>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-border">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Important:</strong> This page provides general emergency information. 
          In a real emergency, always call your local emergency number immediately.
        </p>
      </div>
    </div>
  );
}
