// ─── Metric Card Component ──────────────────────────────────────────────────
import { cn } from "@/lib/cn";
import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: "brand" | "success" | "warning" | "critical" | "info";
}

const colorStyles = {
  brand: "bg-emerald-50 text-emerald-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  critical: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600",
};

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  color = "brand",
}: MetricCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-500 font-medium">{label}</p>
          <p className="mt-2 text-2xl font-bold text-neutral-900 tracking-tight">
            {value}
          </p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              {change > 0 ? (
                <TrendingUp size={14} className="text-emerald-600" />
              ) : change < 0 ? (
                <TrendingDown size={14} className="text-red-600" />
              ) : (
                <Minus size={14} className="text-neutral-400" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  change > 0 && "text-emerald-600",
                  change < 0 && "text-red-600",
                  change === 0 && "text-neutral-500",
                )}
              >
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-neutral-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            colorStyles[color],
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
