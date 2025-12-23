import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import doctorIllustration from "@/assets/doctor-illustration.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const redirectUrl = `${window.location.origin}/reset-password`;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    setIsLoading(false);

    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-card">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">CarePulse</h1>
              <p className="text-sm text-muted-foreground">Your health, powered by AI</p>
            </div>
          </div>

          {/* Forgot Password Card */}
          <div className="card-healthcare p-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>

            <h2 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h2>
            <p className="text-muted-foreground mb-6">
              Enter your registered email address and we'll send you a link to reset your password.
            </p>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <Alert className="mb-6 border-healthcare-success bg-healthcare-success/10">
                <CheckCircle className="h-4 w-4 text-healthcare-success" />
                <AlertDescription className="text-healthcare-success">
                  Password reset link has been sent to your email. Please check your inbox and follow the instructions.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}

            <p className="text-center text-muted-foreground mt-6">
              Remember your password?{" "}
              <Link to="/" className="text-primary font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="relative z-10 text-center">
          <img
            src={doctorIllustration}
            alt="Friendly doctor illustration"
            className="max-w-md w-full h-auto animate-float"
          />
          <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">
            Secure Account Recovery
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            We'll help you regain access to your health dashboard securely.
          </p>
        </div>
      </div>
    </div>
  );
}
