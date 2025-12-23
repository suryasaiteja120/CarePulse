import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Lock, Eye, EyeOff, Check, X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import doctorIllustration from "@/assets/doctor-illustration.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
  ];

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsValidSession(!!session);
      setCheckingSession(false);
    };
    checkSession();
  }, []);

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

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    setIsLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      // Sign out and redirect to login
      await supabase.auth.signOut();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Verifying session...</div>
      </div>
    );
  }

  if (!isValidSession && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card-healthcare p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Invalid or Expired Link</h2>
          <p className="text-muted-foreground mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link to="/forgot-password">
            <Button variant="hero" size="lg">
              Request New Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

          {/* Reset Password Card */}
          <div className="card-healthcare p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
            <p className="text-muted-foreground mb-6">
              Create a new secure password for your account.
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
                  Password updated successfully! Redirecting to login...
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
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
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
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
                  {isLoading ? "Updating Password..." : "Reset Password"}
                </Button>
              </form>
            )}
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
            Secure Your Account
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Create a strong password to protect your health data and account.
          </p>
        </div>
      </div>
    </div>
  );
}
