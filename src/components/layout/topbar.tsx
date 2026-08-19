// ─── Top Bar ────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/avatar";
import { ROLE_LABELS } from "@/lib/navigation";
import type { User as UserType } from "@/lib/types";

interface TopBarProps {
  user: UserType;
  greeting?: string;
}

export function TopBar({ user, greeting }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const hour = new Date().getHours();
  const defaultGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-5 shrink-0">
      {/* Left: Greeting */}
      <div className="hidden sm:block">
        <h2 className="text-base font-semibold text-neutral-900">
          {greeting || defaultGreeting}, {user.name.split(" ")[0]}
        </h2>
        <p className="text-xs text-neutral-500">
          {user.department ? `${user.department} • ` : ""}
          {ROLE_LABELS[user.role]}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 ml-auto sm:ml-0">
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 h-9 px-3 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors text-sm"
        >
          <Search size={18} />
          <span className="hidden lg:inline text-neutral-400">Search</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-neutral-100 text-[10px] font-medium text-neutral-400 rounded border border-neutral-200">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <Avatar name={user.name} size="sm" />
            <ChevronDown
              size={14}
              className={cn(
                "text-neutral-400 transition-transform",
                menuOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-50"
              >
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
                <button
                  onClick={() => { navigate("/settings"); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <User size={16} />
                  Profile
                </button>
                <div className="my-1 border-t border-neutral-100" />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 h-14">
                    <Search size={20} className="text-neutral-400 shrink-0" />
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search patients, appointments, prescriptions..."
                      className="flex-1 text-base text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                    />
                    <kbd className="px-2 py-0.5 bg-neutral-100 text-xs font-medium text-neutral-400 rounded border border-neutral-200">
                      ESC
                    </kbd>
                  </div>
                  {searchQuery && (
                    <div className="border-t border-neutral-100 p-3">
                      <p className="text-xs text-neutral-500 px-2 mb-2">
                        Press Enter to search for &quot;{searchQuery}&quot;
                      </p>
                    </div>
                  )}
                  {!searchQuery && (
                    <div className="border-t border-neutral-100 p-3">
                      <p className="text-xs text-neutral-400 px-2">
                        Type to search across patients, appointments, and more
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
