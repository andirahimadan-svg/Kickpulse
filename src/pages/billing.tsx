// ─── Billing Page ───────────────────────────────────────────────────────────
import { useState } from "react";
import {
  Receipt,
  Search,
  CreditCard,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";

const INVOICES = [
  {
    id: "INV-1001",
    patient: "Mohamed Ali",
    amount: 4500,
    status: "pending",
    date: "2026-08-19",
    items: ["Consultation", "Lipid Panel"],
  },
  {
    id: "INV-1002",
    patient: "Peter Kamau",
    amount: 3000,
    status: "paid",
    date: "2026-08-18",
    items: ["Consultation", "Urinalysis"],
  },
  {
    id: "INV-1003",
    patient: "Daniel Ochieng",
    amount: 6200,
    status: "pending",
    date: "2026-08-19",
    items: ["Consultation", "HbA1c", "Metformin", "Gliclazide"],
  },
  {
    id: "INV-1004",
    patient: "Joseph Otieno",
    amount: 5000,
    status: "paid",
    date: "2026-08-17",
    items: ["Consultation", "ECG", "CBC"],
  },
];

export default function BillingPage() {
  const [search, setSearch] = useState("");

  const filtered = INVOICES.filter(
    (inv) =>
      !search ||
      inv.patient.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPending = INVOICES.filter((i) => i.status === "pending").reduce(
    (s, i) => s + i.amount,
    0,
  );
  const totalPaid = INVOICES.filter((i) => i.status === "paid").reduce(
    (s, i) => s + i.amount,
    0,
  );

  return (
    <div>
      <PageHeader
        title="Billing"
        description="Manage invoices and payments"
        actions={<Button icon={<Receipt size={16} />}>New Invoice</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard
          label="Outstanding"
          value={`KES ${totalPending.toLocaleString()}`}
          icon={<Clock size={20} />}
          color="warning"
        />
        <MetricCard
          label="Collected"
          value={`KES ${totalPaid.toLocaleString()}`}
          icon={<CreditCard size={20} />}
          color="success"
        />
        <MetricCard
          label="Today's Revenue"
          value={`KES ${totalPaid.toLocaleString()}`}
          icon={<TrendingUp size={20} />}
          color="brand"
        />
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search invoices..."
          icon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Receipt size={24} />}
          title="No invoices"
          description="No invoices match your search."
        />
      ) : (
        <Card padding="none">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Invoice
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Patient
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-5 py-3 text-sm font-mono text-neutral-600">
                    {inv.id}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-neutral-900">
                    {inv.patient}
                  </td>
                  <td className="px-5 py-3 text-xs text-neutral-500">
                    {inv.items.join(", ")}
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-neutral-900">
                    KES {inv.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full",
                        inv.status === "paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700",
                      )}
                    >
                      {inv.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {inv.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Record Payment
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
