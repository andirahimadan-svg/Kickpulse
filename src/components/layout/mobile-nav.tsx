// ─── Mobile Bottom Navigation ───────────────────────────────────────────────
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { UserRole } from "@/lib/types";

const MOBILE_NAV_ITEMS: Record<string, { label: string; icon: React.ReactNode; path: string; roles: string[] }> = {
  dashboard: { label: "Home", icon: <LayoutDashboard size={20} />, path: "/dashboard", roles: ["*"] },
  patients: { label: "Patients", icon: <Users size={20} />, path: "/patients", roles: ["*"] },
  appointments: { label: "Schedule", icon: <Calendar size={20} />, path: "/appointments", roles: ["*"] },
  consultations: { label: "Clinical", icon: <Stethoscope size={20} />, path: "/consultations", roles: ["DOCTOR", "NURSE"] },
  more: { label: "More", icon: <MoreHorizontal size={20} />, path: "/more", roles: ["*"] },
};

export function MobileNav({ role }: { role: UserRole }) {
  const location = useLocation();

  const items = Object.values(MOBILE_NAV_ITEMS).filter(
    (item) => item.roles.includes("*") || item.roles.includes(role),
  );

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 z-40 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors min-w-0",
                isActive ? "text-emerald-600" : "text-neutral-500",
              )}
            >
              <span className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                )}
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
