import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Stethoscope, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Info,
  Menu,
  X,
  LogOut,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/symptom-checker", label: "Symptom Checker", icon: Stethoscope },
  { path: "/health-report", label: "Health Report", icon: FileText },
  { path: "/emergency", label: "Emergency Help", icon: AlertTriangle },
  { path: "/calendar", label: "Calendar", icon: Calendar },
  { path: "/about", label: "About", icon: Info },
];

interface NavbarProps {
  onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">CarePulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive ? "nav-link-active" : "nav-link"}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive 
                        ? "bg-accent text-primary font-medium" 
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
