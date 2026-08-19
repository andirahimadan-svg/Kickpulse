// ─── Pharmacy Page ──────────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Pill,
  Search,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { PRESCRIPTIONS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "dispensed", label: "Dispensed" },
];

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return PRESCRIPTIONS.filter((rx) => {
      const matchSearch =
        !search ||
        rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
        rx.medications.some((m) =>
          m.medicationName.toLowerCase().includes(search.toLowerCase()),
        );
      const matchStatus = statusFilter === "all" || rx.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const pendingCount = PRESCRIPTIONS.filter((r) => r.status === "pending").length;
  const dispensedToday = PRESCRIPTIONS.filter((r) => r.status === "dispensed").length;

  return (
    <div>
      <PageHeader
        title="Pharmacy"
        description="Manage prescriptions and dispense medications"
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Pill size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">{pendingCount}</p>
              <p className="text-xs text-neutral-500">Pending</p>
            </div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">{dispensedToday}</p>
              <p className="text-xs text-neutral-500">Dispensed</p>
            </div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">2</p>
              <p className="text-xs text-neutral-500">Low Stock</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search by patient or medication..."
          icon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
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

      {/* Prescriptions */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Pill size={24} />}
          title="No prescriptions found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((rx, i) => (
            <motion.div
              key={rx.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Pill size={16} className="text-emerald-600" />
                  <p className="text-sm font-semibold text-neutral-900">
                    {rx.patientName}
                  </p>
                  <StatusBadge status={rx.status} />
                  <span className="text-xs text-neutral-400 ml-auto">
                    {rx.issuedAt}
                  </span>
                </div>

                <div className="space-y-2">
                  {rx.medications.map((med) => (
                    <div
                      key={med.id}
                      className="flex items-center gap-3 p-2 bg-neutral-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {med.medicationName}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {med.dosage} • {med.frequency} • {med.duration}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-400">
                        ×{med.quantity}
                      </span>
                      {med.dispensed && (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      )}
                    </div>
                  ))}
                </div>

                {rx.notes && (
                  <p className="mt-2 text-xs text-neutral-500 italic">
                    {rx.notes}
                  </p>
                )}

                {rx.status === "pending" && (
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" icon={<CheckCircle2 size={14} />}>
                      Dispense
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
