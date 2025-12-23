import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, Mail, Lock, Eye, EyeOff, Check, X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import doctorIllustration from "@/assets/doctor-illustration.png";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
  ];

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!passwordRequirements.every((r) => r.met)) {
      setError("Please meet all password requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const redirectUrl = `${window.location.origin}/`;

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    setIsLoading(false);

    if (authError) {
      if (authError.message.includes("already registered")) {
        setError("This email is already registered. Please login instead.");
      } else {
        setError(authError.message);
      }
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="relative z-10 text-center">
          <img
            src={doctorIllustration}
            alt="Friendly doctor illustration"
            className="max-w-md w-full h-auto animate-float"
          />
          <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">
            Join CarePulse Today
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Start your journey to better health with AI-powered insights and personalized care.
          </p>
        </div>
      </div>

      {/* Right Panel - Register Form */}
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

          {/* Register Card */}
          <div className="card-healthcare p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground mb-6">Join CarePulse for personalized health insights</p>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-healthcare-success bg-healthcare-success/10">
                <CheckCircle className="h-4 w-4 text-healthcare-success" />
                <AlertDescription className="text-healthcare-success">
                  Account created successfully! Redirecting to login...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <Check className="w-3 h-3 text-healthcare-success" />
                      ) : (
                        <X className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className={req.met ? "text-healthcare-success" : "text-muted-foreground"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {passwordsMatch ? (
                      <>
                        <Check className="w-3 h-3 text-healthcare-success" />
                        <span className="text-healthcare-success">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 text-destructive" />
                        <span className="text-destructive">Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full mt-6"
                disabled={isLoading || success}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/" className="text-primary font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
