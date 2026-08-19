// ─── Dashboard Page ─────────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  FlaskConical,
  AlertTriangle,
  ArrowRight,
  Activity,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { CURRENT_USER, APPOINTMENTS, LAB_ORDERS, QUEUE } from "@/lib/mock-data";
import { ROLE_QUICK_ACTIONS } from "@/lib/navigation";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = CURRENT_USER;

  const todayAppts = APPOINTMENTS.filter(
    (a) => a.date === "2026-08-19" && a.status !== "cancelled",
  );
  const waitingCount = QUEUE.filter((q) => q.status === "waiting").length;
  const pendingLabs = LAB_ORDERS.filter(
    (l) => l.status === "pending" || l.status === "processing",
  ).length;
  const criticalLabs = LAB_ORDERS.filter((l) => l.status === "critical").length;
  const quickActions = ROLE_QUICK_ACTIONS[user.role] || [];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Metrics */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <MetricCard
          label="Appointments Today"
          value={todayAppts.length}
          icon={<Calendar size={20} />}
          color="info"
        />
        <MetricCard
          label="Patients Waiting"
          value={waitingCount}
          icon={<Clock size={20} />}
          color="warning"
        />
        <MetricCard
          label="Pending Lab Results"
          value={pendingLabs}
          icon={<FlaskConical size={20} />}
          color="brand"
        />
        <MetricCard
          label="Critical Results"
          value={criticalLabs}
          icon={<AlertTriangle size={20} />}
          color="critical"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Appointments</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/appointments")}
              >
                View all <ArrowRight size={14} />
              </Button>
            </CardHeader>
            {todayAppts.length === 0 ? (
              <EmptyState
                icon={<Calendar size={24} />}
                title="No appointments today"
                description="Your schedule is clear for today."
              />
            ) : (
              <div className="space-y-1">
                {todayAppts.map((apt, i) => (
                  <motion.button
                    key={apt.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/patients/${apt.patientId}`)}
                    className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-neutral-50 transition-colors text-left"
                  >
                    <div className="text-center min-w-[48px]">
                      <p className="text-sm font-semibold text-neutral-900">
                        {apt.time}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {apt.duration}min
                      </p>
                    </div>
                    <div className="w-px h-8 bg-neutral-200" />
                    <Avatar name={apt.patientName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {apt.patientName}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {apt.reason}
                      </p>
                    </div>
                    <StatusBadge status={apt.status} />
                  </motion.button>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Quick Actions + Queue */}
        <motion.div variants={item} className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-50 hover:bg-emerald-50 hover:text-emerald-700 text-neutral-600 transition-colors"
                >
                  <Activity size={20} className="text-current" />
                  <span className="text-xs font-medium text-center">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Patient Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Queue</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/queue")}
              >
                View <ArrowRight size={14} />
              </Button>
            </CardHeader>
            {QUEUE.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-4">
                Queue is empty
              </p>
            ) : (
              <div className="space-y-2">
                {QUEUE.slice(0, 4).map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 p-2 rounded-lg"
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        q.priority === "urgent"
                          ? "bg-red-100 text-red-700"
                          : q.priority === "emergency"
                            ? "bg-red-500 text-white"
                            : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {q.position}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {q.patientName}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {q.checkInTime} • {q.type.replace("_", " ")}
                      </p>
                    </div>
                    {q.priority === "urgent" && (
                      <StatusBadge status="critical" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
