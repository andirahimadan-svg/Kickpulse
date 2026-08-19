// ─── Queue Page ─────────────────────────────────────────────────────────────
import { motion } from "framer-motion";
import {
  Clock,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { QUEUE } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export default function QueuePage() {
  const waiting = QUEUE.filter((q) => q.status === "waiting");
  const withDoctor = QUEUE.filter((q) => q.status === "with_doctor");

  return (
    <div>
      <PageHeader
        title="Patient Queue"
        description={`${waiting.length} patients waiting`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waiting */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Waiting ({waiting.length})
          </h3>
          {waiting.length === 0 ? (
            <EmptyState
              icon={<Clock size={24} />}
              title="No patients waiting"
              description="The queue is clear."
            />
          ) : (
            <div className="space-y-2">
              {waiting.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    padding="sm"
                    className={cn(
                      "flex items-center gap-4",
                      q.priority === "urgent" && "border-amber-200 bg-amber-50/30",
                    )}
                  >
                    <span
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                        q.priority === "urgent"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-neutral-100 text-neutral-600",
                      )}
                    >
                      {q.position}
                    </span>
                    <Avatar name={q.patientName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900">
                        {q.patientName}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {q.checkInTime} • {q.type.replace("_", " ")}
                      </p>
                    </div>
                    {q.priority === "urgent" && (
                      <span className="flex items-center gap-1 text-xs text-amber-700 font-medium">
                        <AlertTriangle size={12} /> Urgent
                      </span>
                    )}
                    <Button size="sm" variant="outline">
                      Call
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* With Doctor */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            In Consultation ({withDoctor.length})
          </h3>
          {withDoctor.length === 0 ? (
            <EmptyState
              icon={<UserCheck size={24} />}
              title="No active consultations"
              description="No patients are currently with a doctor."
            />
          ) : (
            <div className="space-y-2">
              {withDoctor.map((q) => (
                <Card key={q.id} padding="sm" className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
                    {q.position}
                  </span>
                  <Avatar name={q.patientName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      {q.patientName}
                    </p>
                    <p className="text-xs text-neutral-500">
                      With doctor since {q.checkInTime}
                    </p>
                  </div>
                  <StatusBadge status="with_doctor" />
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
