// ─── Settings Page ──────────────────────────────────────────────────────────
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  Palette,
  Building,
  LogOut,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { CURRENT_USER } from "@/lib/mock-data";
import { ROLE_LABELS } from "@/lib/navigation";

const SECTIONS = [
  {
    icon: <User size={20} />,
    title: "Profile",
    description: "Manage your personal information",
  },
  {
    icon: <Shield size={20} />,
    title: "Security",
    description: "Password, two-factor authentication",
  },
  {
    icon: <Bell size={20} />,
    title: "Notifications",
    description: "Configure notification preferences",
  },
  {
    icon: <Palette size={20} />,
    title: "Appearance",
    description: "Theme, display density, language",
  },
  {
    icon: <Building size={20} />,
    title: "Organization",
    description: "Northstar Medical Center settings",
  },
];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      {/* Profile card */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={CURRENT_USER.name} size="xl" />
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {CURRENT_USER.name}
            </h3>
            <p className="text-sm text-neutral-500">{CURRENT_USER.email}</p>
            <p className="text-sm text-neutral-500 mt-0.5">
              {ROLE_LABELS[CURRENT_USER.role]} • {CURRENT_USER.department}
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Settings sections */}
      <div className="space-y-2">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card
              padding="sm"
              className="cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">
                    {section.title}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {section.description}
                  </p>
                </div>
                <span className="text-neutral-300">→</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sign out */}
      <div className="mt-8">
        <Button
          variant="outline"
          icon={<LogOut size={16} />}
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={() => window.location.href = "/login"}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
