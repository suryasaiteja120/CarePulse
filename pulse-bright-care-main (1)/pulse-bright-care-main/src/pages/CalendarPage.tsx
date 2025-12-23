import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, User, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Appointment {
  id: number;
  title: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
}

// Mock appointments - TODO: Database integration
const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: "Annual Checkup",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-25",
    time: "10:00 AM",
    location: "City Medical Center",
  },
  {
    id: 2,
    title: "Dental Cleaning",
    doctor: "Dr. Michael Chen",
    date: "2024-02-01",
    time: "2:30 PM",
    location: "Smile Dental Clinic",
  },
  {
    id: 3,
    title: "Follow-up Consultation",
    doctor: "Dr. Emily Brown",
    date: "2024-02-10",
    time: "11:00 AM",
    location: "Health First Clinic",
  },
];

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    doctor: "",
    date: "",
    time: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Backend integration - Save to database via API
    const newAppointment: Appointment = {
      id: Date.now(),
      ...formData,
    };
    
    setAppointments([...appointments, newAppointment]);
    setFormData({ title: "", doctor: "", date: "", time: "", location: "" });
    setShowForm(false);
    toast.success("Appointment scheduled successfully!");
  };

  const handleDelete = (id: number) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
    toast.success("Appointment cancelled");
  };

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  // Generate calendar days
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const calendarDays = [];
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const hasAppointment = (day: number) => {
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.some((apt) => apt.date === dateStr);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10">
              <CalendarIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
              <p className="text-muted-foreground">Manage your appointments</p>
            </div>
          </div>
          <Button variant="hero" className="gap-2" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-5 h-5" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card-healthcare p-6 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-6">{currentMonth}</h2>
            
            {/* Week Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square p-2 rounded-xl flex flex-col items-center justify-center text-sm transition-all ${
                    day === today.getDate()
                      ? "bg-primary text-primary-foreground font-bold"
                      : day
                      ? "hover:bg-accent cursor-pointer"
                      : ""
                  }`}
                >
                  {day && (
                    <>
                      <span>{day}</span>
                      {hasAppointment(day) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1" />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* New Appointment Form */}
          {showForm && (
            <div className="card-healthcare p-6 mt-6 opacity-0 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Schedule New Appointment</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Appointment Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Annual Checkup"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Doctor Name
                    </label>
                    <Input
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      placeholder="e.g., Dr. Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., City Medical Center"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" variant="hero">
                    Schedule Appointment
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-1">
          <div className="card-healthcare p-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-lg font-bold text-foreground mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No upcoming appointments</p>
              ) : (
                appointments.map((apt) => (
                  <div key={apt.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{apt.title}</h3>
                      <button
                        onClick={() => handleDelete(apt.id)}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {apt.doctor}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(apt.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {apt.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {apt.location}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
