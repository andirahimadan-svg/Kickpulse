// ─── Laboratory Page ────────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { LAB_ORDERS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "critical", label: "Critical" },
  { value: "verified", label: "Verified" },
];

export default function LaboratoryPage() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return LAB_ORDERS.filter((lab) => {
      const matchSearch =
        !search ||
        lab.patientName.toLowerCase().includes(search.toLowerCase()) ||
        lab.testName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || lab.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const criticalCount = LAB_ORDERS.filter((l) => l.status === "critical").length;
  const pendingCount = LAB_ORDERS.filter(
    (l) => l.status === "pending" || l.status === "processing",
  ).length;

  return (
    <div>
      <PageHeader
        title="Laboratory"
        description={`${LAB_ORDERS.length} test orders`}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">{pendingCount}</p>
              <p className="text-xs text-neutral-500">Pending</p>
            </div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">{criticalCount}</p>
              <p className="text-xs text-neutral-500">Critical</p>
            </div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">
                {LAB_ORDERS.filter((l) => l.status === "verified").length}
              </p>
              <p className="text-xs text-neutral-500">Verified</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search by patient or test name..."
          icon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg overflow-x-auto">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                statusFilter === f.value
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lab orders list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={24} />}
          title="No lab orders found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                padding="sm"
                className={cn(
                  "hover:border-neutral-300 transition-colors",
                  lab.status === "critical" && "border-red-200 bg-red-50/30",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      lab.status === "critical"
                        ? "bg-red-100"
                        : "bg-blue-50",
                    )}
                  >
                    <FlaskConical
                      size={18}
                      className={
                        lab.status === "critical"
                          ? "text-red-600"
                          : "text-blue-600"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-neutral-900">
                        {lab.testName}
                      </p>
                      <StatusBadge status={lab.status} />
                    </div>
                    <p className="text-xs text-neutral-500">
                      {lab.patientName} • {lab.orderedByName} • {lab.requestedAt}
                    </p>
                    {lab.result && (
                      <pre className="mt-2 p-2 bg-neutral-50 rounded text-xs text-neutral-700 font-mono whitespace-pre-wrap max-h-24 overflow-y-auto">
                        {lab.result}
                      </pre>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    {lab.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Collect Sample
                      </Button>
                    )}
                    {lab.status === "sample_collected" && (
                      <Button size="sm" variant="outline">
                        Start Processing
                      </Button>
                    )}
                    {lab.status === "ready" && (
                      <Button size="sm" variant="outline">
                        Verify Result
                      </Button>
                    )}
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
