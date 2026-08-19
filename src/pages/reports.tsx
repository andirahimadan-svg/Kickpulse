// ─── Reports Page ───────────────────────────────────────────────────────────
import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { PATIENTS, APPOINTMENTS, LAB_ORDERS } from "@/lib/mock-data";

export default function ReportsPage() {
  const todayAppts = APPOINTMENTS.filter((a) => a.date === "2026-08-19");
  const completedAppts = todayAppts.filter((a) => a.status === "completed");

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Operational insights and analytics"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Total Patients"
          value={PATIENTS.length}
          icon={<BarChart3 size={20} />}
          color="brand"
          change={12}
          changeLabel="vs last month"
        />
        <MetricCard
          label="Today's Appointments"
          value={todayAppts.length}
          icon={<BarChart3 size={20} />}
          color="info"
        />
        <MetricCard
          label="Lab Orders"
          value={LAB_ORDERS.length}
          icon={<BarChart3 size={20} />}
          color="warning"
        />
        <MetricCard
          label="Completion Rate"
          value={todayAppts.length > 0 ? `${Math.round((completedAppts.length / todayAppts.length) * 100)}%` : "—"}
          icon={<BarChart3 size={20} />}
          color="success"
        />
      </div>

      <Card className="text-center py-16">
        <BarChart3 size={32} className="mx-auto text-neutral-300 mb-3" />
        <h3 className="text-base font-medium text-neutral-900 mb-1">
          Detailed Reports
        </h3>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          Advanced reporting and analytics will be available in a future update.
        </p>
      </Card>
    </div>
  );
}
