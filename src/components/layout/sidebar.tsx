// ─── Sidebar Navigation ─────────────────────────────────────────────────────
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ListOrdered,
  Stethoscope,
  FlaskConical,
  Pill,
  Receipt,
  UserCog,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { getNavForRole, type NavItem } from "@/lib/navigation";
import type { UserRole } from "@/lib/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  Calendar: <Calendar size={20} />,
  ListOrdered: <ListOrdered size={20} />,
  Stethoscope: <Stethoscope size={20} />,
  FlaskConical: <FlaskConical size={20} />,
  Pill: <Pill size={20} />,
  Receipt: <Receipt size={20} />,
  UserCog: <UserCog size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Bell: <Bell size={20} />,
  Settings: <Settings size={20} />,
};

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ role, collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const navItems = getNavForRole(role);

  // Split into primary and secondary
  const primaryItems = navItems.filter(
    (item) => !["settings", "notifications"].includes(item.id),
  );
  const secondaryItems = navItems.filter((item) =>
    ["notifications", "settings"].includes(item.id),
  );

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-full bg-white border-r border-neutral-200 transition-all duration-200",
        collapsed ? "w-[68px]" : "w-[240px]",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-neutral-200 shrink-0",
          collapsed ? "justify-center px-2" : "px-5",
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <Activity size={18} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold text-neutral-900 whitespace-nowrap overflow-hidden"
              >
                HealthOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        {/* Primary items */}
        <div className="space-y-0.5">
          {primaryItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              active={location.pathname.startsWith(item.path)}
            />
          ))}
        </div>

        {/* Divider */}
        {secondaryItems.length > 0 && (
          <>
            <div className="my-3 border-t border-neutral-100" />
            <div className="space-y-0.5">
              {secondaryItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                  active={location.pathname.startsWith(item.path)}
                />
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-neutral-200 p-2">
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 w-full rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 transition-colors",
            collapsed && "justify-center",
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  item,
  collapsed,
  active,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
}) {
  return (
    <NavLink
      to={item.path}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
        collapsed && "justify-center px-2",
        active
          ? "bg-emerald-50 text-emerald-700"
          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
      )}
      title={collapsed ? item.label : undefined}
    >
      <span className="shrink-0">{ICON_MAP[item.icon]}</span>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {item.badge && !collapsed && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {item.badge > 9 ? "9+" : item.badge}
        </span>
      )}
    </NavLink>
  );
}
