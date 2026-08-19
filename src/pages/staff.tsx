// ─── Staff Page ─────────────────────────────────────────────────────────────
import { useState } from "react";
import { motion } from "framer-motion";
import { UserCog, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { ALL_USERS } from "@/lib/mock-data";
import { ROLE_LABELS } from "@/lib/navigation";

export default function StaffPage() {
  const [search, setSearch] = useState("");

  const filtered = ALL_USERS.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Staff"
        description={`${ALL_USERS.length} team members`}
        actions={<Button icon={<UserCog size={16} />}>Invite Staff</Button>}
      />

      <div className="mb-6">
        <Input
          placeholder="Search staff..."
          icon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="text-center">
              <Avatar name={user.name} size="lg" className="mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-neutral-900">
                {user.name}
              </h3>
              <Badge variant="info" className="mt-1">
                {ROLE_LABELS[user.role]}
              </Badge>
              {user.department && (
                <p className="text-xs text-neutral-500 mt-2">{user.department}</p>
              )}
              <p className="text-xs text-neutral-400 mt-1">{user.email}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
