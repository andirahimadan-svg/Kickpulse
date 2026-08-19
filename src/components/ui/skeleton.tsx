// ─── Skeleton Component ─────────────────────────────────────────────────────
import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-200 rounded-lg",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded",
        className,
      )}
      style={{ width, height }}
    />
  );
}

// ─── Skeleton Card ──────────────────────────────────────────────────────────

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" height={16} className="w-1/3" />
          <Skeleton variant="text" height={12} className="w-1/4" />
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={12}
          className={i === rows - 1 ? "w-2/3" : "w-full"}
        />
      ))}
    </div>
  );
}

// ─── Skeleton Table ─────────────────────────────────────────────────────────

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="text" height={12} className="flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-neutral-100">
          {Array.from({ length: 5 }).map((_, j) => (
            <Skeleton
              key={j}
              variant="text"
              height={14}
              className="flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
