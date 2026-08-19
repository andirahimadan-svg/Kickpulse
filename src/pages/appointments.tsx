// ─── Appointments Page ──────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { APPOINTMENTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import { format, addDays, subDays, isToday } from "date-fns";

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date("2026-08-19"));
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const filtered = useMemo(() => {
    return APPOINTMENTS.filter((a) => {
      const matchDate = a.date === dateStr;
      const matchSearch =
        !search ||
        a.patientName.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || a.type === typeFilter;
      return matchDate && matchSearch && matchType;
    });
  }, [dateStr, search, typeFilter]);

  const appointmentTypes = [
    { value: "all", label: "All" },
    { value: "consultation", label: "Consultation" },
    { value: "follow_up", label: "Follow-up" },
    { value: "emergency", label: "Emergency" },
    { value: "lab", label: "Lab" },
  ];

  return (
    <div>
      <PageHeader
        title="Appointments"
        description={`${filtered.length} appointments on ${format(selectedDate, "dd MMM yyyy")}`}
        actions={
          <Button icon={<Plus size={16} />}>Book Appointment</Button>
        }
      />

      {/* Date navigation */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <h3 className="text-base font-semibold text-neutral-900">
              {format(selectedDate, "EEEE, dd MMMM yyyy")}
            </h3>
            {isToday(selectedDate) && (
              <span className="text-xs text-emerald-600 font-medium">Today</span>
            )}
          </div>
          <button
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Quick date chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const d = addDays(new Date("2026-08-16"), i);
            const isActive = format(d, "yyyy-MM-dd") === dateStr;
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className={cn(
                  "flex flex-col items-center min-w-[56px] p-2 rounded-lg text-xs font-medium transition-colors",
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100",
                )}
              >
                <span className="text-[10px] uppercase">{format(d, "EEE")}</span>
                <span className="text-base font-bold">{format(d, "d")}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search by patient name..."
          icon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg overflow-x-auto">
          {appointmentTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTypeFilter(t.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                typeFilter === t.value
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Calendar size={24} />}
          title="No appointments"
          description={`No appointments scheduled for ${format(selectedDate, "dd MMM")}.`}
          action={<Button size="sm" icon={<Plus size={14} />}>Book Appointment</Button>}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                padding="sm"
                className="cursor-pointer hover:border-neutral-300 transition-colors"
                onClick={() => navigate(`/patients/${apt.patientId}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[56px]">
                    <div className="flex items-center gap-1 text-neutral-900">
                      <Clock size={14} className="text-neutral-400" />
                      <span className="text-sm font-semibold">{apt.time}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {apt.duration}min
                    </p>
                  </div>
                  <div className="w-px h-10 bg-neutral-200" />
                  <Avatar name={apt.patientName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {apt.patientName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {apt.reason} • {apt.doctorName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-neutral-400 capitalize hidden sm:inline">
                      {apt.type.replace("_", " ")}
                    </span>
                    <StatusBadge status={apt.status} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
