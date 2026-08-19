// ─── App Layout ─────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { MobileNav } from "./mobile-nav";
import { CURRENT_USER } from "@/lib/mock-data";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const user = CURRENT_USER;

  // Close sidebar on mobile route change
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar — desktop only */}
      <Sidebar
        role={user.role}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar user={user} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 pb-24 md:pb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav role={user.role} />
    </div>
  );
}

// ─── Protected Route Wrapper ────────────────────────────────────────────────

export function ProtectedRoute() {
  // In production, check Supabase session here.
  // For MVP, always authenticated with mock user.
  return <AppLayout />;
}
