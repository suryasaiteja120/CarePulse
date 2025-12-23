import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import doctorIllustration from "@/assets/doctor-illustration.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (authError) {
      if (authError.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please check your credentials and try again.");
      } else if (authError.message.includes("Email not confirmed")) {
        setError("Please verify your email address before logging in.");
      } else {
        setError(authError.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
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

          {/* Login Card */}
          <div className="card-healthcare p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground mb-6">Sign in to continue to your health dashboard</p>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="Enter your password"
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
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Create Account
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
            Your AI Health Companion
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Get instant health insights, track your symptoms, and receive personalized care recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
