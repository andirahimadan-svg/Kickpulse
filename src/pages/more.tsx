// ─── More Page (Mobile overflow navigation) ─────────────────────────────────
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Pill,
  Receipt,
  UserCog,
  BarChart3,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { CURRENT_USER } from "@/lib/mock-data";
import { ROLE_LABELS, getNavForRole } from "@/lib/navigation";

const ICON_MAP: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical size={20} />,
  Pill: <Pill size={20} />,
  Receipt: <Receipt size={20} />,
  UserCog: <UserCog size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Bell: <Bell size={20} />,
  Settings: <Settings size={20} />,
};

export default function MorePage() {
  const navigate = useNavigate();
  const navItems = getNavForRole(CURRENT_USER.role);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">More</h1>
        <p className="text-sm text-neutral-500">
          {CURRENT_USER.name} • {ROLE_LABELS[CURRENT_USER.role]}
        </p>
      </div>

      <div className="space-y-1">
        {navItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span className="text-neutral-500">{ICON_MAP[item.icon]}</span>
            <span className="text-sm font-medium text-neutral-900">
              {item.label}
            </span>
            <span className="ml-auto text-neutral-300">→</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-4">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
}
