// ─── Patients List Page ─────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { PATIENTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export default function PatientsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = useMemo(() => {
    return PATIENTS.filter((p) => {
      const matchesSearch =
        !search ||
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        p.medicalRecordNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div>
      <PageHeader
        title="Patients"
        description={`${PATIENTS.length} patients registered`}
        actions={
          <Button
            icon={<Plus size={16} />}
            onClick={() => navigate("/patients/new")}
          >
            Register Patient
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search by name, ID, or phone..."
          icon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg">
          {(["all", "active", "inactive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize",
                statusFilter === s
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card padding="none">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Patient
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  ID
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Age
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Phone
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Last Visit
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="border-b border-neutral-50 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={`${patient.firstName} ${patient.lastName}`} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {patient.sex === "male" ? "Male" : "Female"} • {patient.bloodType || "—"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-neutral-600 font-mono">
                    {patient.medicalRecordNumber}
                  </td>
                  <td className="px-5 py-3 text-sm text-neutral-600">{patient.age}</td>
                  <td className="px-5 py-3 text-sm text-neutral-600">{patient.phone}</td>
                  <td className="px-5 py-3 text-sm text-neutral-600">
                    {patient.lastVisit || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <EmptyState
              icon={<Users size={24} />}
              title="No patients found"
              description="Try adjusting your search or filters."
            />
          )}
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={24} />}
            title="No patients found"
            description="Try adjusting your search or filters."
          />
        ) : (
          filtered.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                padding="sm"
                className="cursor-pointer hover:border-neutral-300 transition-colors"
                onClick={() => navigate(`/patients/${patient.id}`)}
              >
                <div className="flex items-start gap-3">
                  <Avatar name={`${patient.firstName} ${patient.lastName}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-neutral-900">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <StatusBadge status={patient.status} />
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 font-mono">
                      {patient.medicalRecordNumber} • {patient.age}y • {patient.sex}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {patient.phone} • Last visit: {patient.lastVisit || "Never"}
                    </p>
                    {patient.allergies.length > 0 && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
                        ⚠ Allergies: {patient.allergies.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
