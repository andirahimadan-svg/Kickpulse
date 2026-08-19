// ─── Status Badge Component ─────────────────────────────────────────────────
import { cn } from "@/lib/cn";

type StatusType =
  | "scheduled"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show"
  | "pending"
  | "processing"
  | "ready"
  | "critical"
  | "verified"
  | "dispensed"
  | "partial"
  | "waiting"
  | "with_doctor"
  | "sample_collected"
  | "active"
  | "inactive";

const STATUS_CONFIG: Record<StatusType, { label: string; className: string }> = {
  scheduled: { label: "Scheduled", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  checked_in: { label: "Checked In", className: "bg-violet-50 text-violet-700 border border-violet-200" },
  in_progress: { label: "In Progress", className: "bg-amber-50 text-amber-700 border border-amber-200" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  cancelled: { label: "Cancelled", className: "bg-neutral-100 text-neutral-500 border border-neutral-200" },
  no_show: { label: "No Show", className: "bg-red-50 text-red-600 border border-red-200" },
  pending: { label: "Pending", className: "bg-neutral-100 text-neutral-600 border border-neutral-200" },
  processing: { label: "Processing", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  ready: { label: "Ready", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  critical: { label: "Critical", className: "bg-red-50 text-red-700 border border-red-200" },
  verified: { label: "Verified", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  dispensed: { label: "Dispensed", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  partial: { label: "Partial", className: "bg-amber-50 text-amber-700 border border-amber-200" },
  waiting: { label: "Waiting", className: "bg-amber-50 text-amber-700 border border-amber-200" },
  with_doctor: { label: "With Doctor", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  sample_collected: { label: "Sample Collected", className: "bg-violet-50 text-violet-700 border border-violet-200" },
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  inactive: { label: "Inactive", className: "bg-neutral-100 text-neutral-500 border border-neutral-200" },
};

const DOT_COLOR: Record<StatusType, string> = {
  scheduled: "bg-blue-500",
  checked_in: "bg-violet-500",
  in_progress: "bg-amber-500",
  completed: "bg-emerald-500",
  cancelled: "bg-neutral-400",
  no_show: "bg-red-500",
  pending: "bg-neutral-400",
  processing: "bg-blue-500",
  ready: "bg-emerald-500",
  critical: "bg-red-500",
  verified: "bg-emerald-500",
  dispensed: "bg-emerald-500",
  partial: "bg-amber-500",
  waiting: "bg-amber-500",
  with_doctor: "bg-blue-500",
  sample_collected: "bg-violet-500",
  active: "bg-emerald-500",
  inactive: "bg-neutral-400",
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const dotColor = DOT_COLOR[status] || "bg-neutral-400";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full",
        config.className,
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      {config.label}
    </span>
  );
}
