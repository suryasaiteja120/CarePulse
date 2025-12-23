import { useState } from "react";
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  Heart,
  Clock,
  User,
  Brain,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const symptomCategories = [
  { value: "general", label: "General (Fever, Fatigue, Pain)" },
  { value: "respiratory", label: "Respiratory (Cough, Breathing, Congestion)" },
  { value: "digestive", label: "Digestive (Stomach, Nausea, Appetite)" },
  { value: "cardiac", label: "Cardiac (Chest, Heart, Circulation)" },
  { value: "mental", label: "Mental Health (Anxiety, Depression, Stress)" },
  { value: "neurological", label: "Neurological (Headache, Dizziness, Memory)" },
  { value: "musculoskeletal", label: "Musculoskeletal (Joint, Muscle, Back)" },
  { value: "dermatological", label: "Dermatological (Skin, Rash, Itching)" },
];

const durationUnits = [
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
  { value: "months", label: "Months" },
  { value: "years", label: "Years" },
];

interface AnalysisResult {
  severity: "mild" | "moderate" | "severe";
  shouldConsultDoctor: boolean;
  preventiveMeasures: string[];
  healthyHabits: string[];
  isEmergency: boolean;
  confidenceScore?: number;
  possibleConditions?: string[];
  warningSignsToWatch?: string[];
  reasoning?: string;
}

export default function SymptomChecker() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("days");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !description || !age || !durationValue) {
      toast.error("Please fill in all fields");
      return;
    }

    if (description.length < 10) {
      toast.error("Please provide a more detailed symptom description");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-symptoms', {
        body: {
          category,
          description,
          age: parseInt(age),
          duration: parseInt(durationValue),
          durationUnit
        }
      });

      if (error) {
        console.error("Error analyzing symptoms:", error);
        toast.error("Failed to analyze symptoms. Please try again.");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setResult(data);
      
      if (data.confidenceScore) {
        toast.success(`Analysis complete with ${data.confidenceScore}% confidence`);
      } else {
        toast.success("Analysis complete");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Symptom Checker</h1>
            <p className="text-muted-foreground">AI-powered health analysis</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card-healthcare p-6 md:p-8 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptom Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Symptom Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-12 w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              required
            >
              <option value="">Select a category</option>
              {symptomCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Symptom Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Describe Your Symptoms
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your symptoms in detail..."
              rows={4}
              className="flex w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
              required
            />
          </div>

          {/* Age and Duration Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Age
                </div>
              </label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                min="0"
                max="120"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Symptom Duration
                </div>
              </label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={durationValue}
                  onChange={(e) => setDurationValue(e.target.value)}
                  placeholder="Duration"
                  min="1"
                  className="flex-1"
                  required
                />
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  className="h-12 rounded-xl border border-border bg-card px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                >
                  {durationUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Stethoscope className="w-5 h-5" />
                Check Result
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Emergency Alert */}
          {result.isEmergency && (
            <div className="bg-severity-severe/10 border-2 border-severity-severe/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-severity-severe/20">
                  <AlertTriangle className="w-6 h-6 text-severity-severe" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-severity-severe mb-2">
                    Emergency Alert
                  </h3>
                  <p className="text-foreground">
                    Based on your symptoms, we recommend seeking immediate medical attention. 
                    Please contact emergency services or visit the nearest emergency room.
                  </p>
                  <Button variant="severe" className="mt-4">
                    View Emergency Contacts
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Severity Card */}
          <div className="card-healthcare p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">AI Analysis Result</h3>
              {result.confidenceScore && (
                <span className="ml-auto text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {result.confidenceScore}% Confidence
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Condition Stage</p>
                <SeverityBadge severity={result.severity} />
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Consult a Doctor?</p>
                <div className={`flex items-center gap-2 font-medium ${result.shouldConsultDoctor ? "text-severity-moderate" : "text-severity-mild"}`}>
                  {result.shouldConsultDoctor ? (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      Recommended
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Not Urgent
                    </>
                  )}
                </div>
              </div>
            </div>
            {result.reasoning && (
              <p className="text-sm text-muted-foreground border-t border-border pt-4 mt-4">
                <strong>Assessment:</strong> {result.reasoning}
              </p>
            )}
          </div>

          {/* Possible Conditions & Warning Signs */}
          {(result.possibleConditions?.length || result.warningSignsToWatch?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.possibleConditions && result.possibleConditions.length > 0 && (
                <div className="card-healthcare p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Activity className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Possible Conditions</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.possibleConditions.map((condition, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {result.warningSignsToWatch && result.warningSignsToWatch.length > 0 && (
                <div className="card-healthcare p-6 border-severity-moderate/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-severity-moderate/10">
                      <AlertTriangle className="w-5 h-5 text-severity-moderate" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Warning Signs to Watch</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.warningSignsToWatch.map((sign, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-severity-moderate" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preventive Measures */}
            <div className="card-healthcare p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Preventive Measures</h3>
              </div>
              <ul className="space-y-3">
                {result.preventiveMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    {measure}
                  </li>
                ))}
              </ul>
            </div>

            {/* Healthy Habits */}
            <div className="card-healthcare p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Healthy Habits</h3>
              </div>
              <ul className="space-y-3">
                {result.healthyHabits.map((habit, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0" />
                    {habit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-border">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Disclaimer:</strong> This AI symptom checker provides general health information only. 
          It is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  );
}
