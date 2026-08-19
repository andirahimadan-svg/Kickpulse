// ─── Notifications Page ─────────────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  FlaskConical,
  Clock,
  Settings,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  clinical: <FlaskConical size={16} className="text-blue-600" />,
  operational: <Clock size={16} className="text-amber-600" />,
  administrative: <Settings size={16} className="text-neutral-600" />,
  system: <Bell size={16} className="text-violet-600" />,
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = NOTIFICATIONS.filter(
    (n) => filter === "all" || !n.read,
  );

  return (
    <div>
      <PageHeader
        title="Notifications"
        description={`${NOTIFICATIONS.filter((n) => !n.read).length} unread`}
        actions={
          <Button variant="ghost" size="sm" icon={<CheckCheck size={16} />}>
            Mark all read
          </Button>
        }
      />

      <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg mb-6 w-fit">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize",
              filter === f
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bell size={24} />}
          title="No notifications"
          description="You're all caught up."
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                padding="sm"
                className={cn(
                  "cursor-pointer hover:border-neutral-300 transition-colors",
                  !notif.read && "bg-emerald-50/30 border-emerald-200",
                )}
                onClick={() =>
                  notif.actionUrl && navigate(notif.actionUrl)
                }
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    {CATEGORY_ICONS[notif.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-neutral-900">
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      {notif.message}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
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
