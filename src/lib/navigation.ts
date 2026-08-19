// ─── Navigation Configuration ───────────────────────────────────────────────

import type { UserRole } from "./types";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles: UserRole[];
  badge?: number;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN", "CASHIER", "RECORDS_OFFICER", "MANAGER"],
  },
  {
    id: "patients",
    label: "Patients",
    icon: "Users",
    path: "/patients",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN", "RECORDS_OFFICER", "MANAGER"],
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: "Calendar",
    path: "/appointments",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "MANAGER"],
  },
  {
    id: "queue",
    label: "Queue",
    icon: "ListOrdered",
    path: "/queue",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"],
  },
  {
    id: "consultations",
    label: "Consultations",
    icon: "Stethoscope",
    path: "/consultations",
    roles: ["ADMIN", "DOCTOR", "NURSE"],
  },
  {
    id: "laboratory",
    label: "Laboratory",
    icon: "FlaskConical",
    path: "/laboratory",
    roles: ["ADMIN", "DOCTOR", "NURSE", "LAB_TECHNICIAN"],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    icon: "Pill",
    path: "/pharmacy",
    roles: ["ADMIN", "DOCTOR", "PHARMACIST"],
  },
  {
    id: "billing",
    label: "Billing",
    icon: "Receipt",
    path: "/billing",
    roles: ["ADMIN", "CASHIER", "MANAGER"],
  },
  {
    id: "staff",
    label: "Staff",
    icon: "UserCog",
    path: "/staff",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    id: "reports",
    label: "Reports",
    icon: "BarChart3",
    path: "/reports",
    roles: ["ADMIN", "MANAGER", "DOCTOR"],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "Bell",
    path: "/notifications",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN", "CASHIER", "RECORDS_OFFICER", "MANAGER"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    path: "/settings",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN", "CASHIER", "RECORDS_OFFICER", "MANAGER"],
  },
];

export function getNavForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}

// ─── Role Display Names ─────────────────────────────────────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Administrator",
  DOCTOR: "Doctor",
  NURSE: "Nurse",
  RECEPTIONIST: "Receptionist",
  PHARMACIST: "Pharmacist",
  LAB_TECHNICIAN: "Lab Technician",
  CASHIER: "Cashier",
  RECORDS_OFFICER: "Records Officer",
  MANAGER: "Manager",
};

// ─── Quick Access for Each Role ─────────────────────────────────────────────

export const ROLE_QUICK_ACTIONS: Record<UserRole, { label: string; path: string; icon: string }[]> = {
  RECEPTIONIST: [
    { label: "Register Patient", path: "/patients/new", icon: "UserPlus" },
    { label: "Book Appointment", path: "/appointments/new", icon: "CalendarPlus" },
    { label: "View Queue", path: "/queue", icon: "ListOrdered" },
    { label: "Find Patient", path: "/patients", icon: "Search" },
  ],
  DOCTOR: [
    { label: "Start Consultation", path: "/consultations", icon: "Stethoscope" },
    { label: "View Queue", path: "/queue", icon: "ListOrdered" },
    { label: "Lab Results", path: "/laboratory", icon: "FlaskConical" },
    { label: "My Patients", path: "/patients", icon: "Users" },
  ],
  NURSE: [
    { label: "View Queue", path: "/queue", icon: "ListOrdered" },
    { label: "Vitals Entry", path: "/consultations", icon: "HeartPulse" },
    { label: "Lab Requests", path: "/laboratory", icon: "FlaskConical" },
    { label: "Patients", path: "/patients", icon: "Users" },
  ],
  PHARMACIST: [
    { label: "Pending Prescriptions", path: "/pharmacy", icon: "Pill" },
    { label: "Dispense", path: "/pharmacy", icon: "CheckCircle" },
    { label: "Inventory", path: "/pharmacy", icon: "Package" },
    { label: "Patients", path: "/patients", icon: "Users" },
  ],
  LAB_TECHNICIAN: [
    { label: "Pending Tests", path: "/laboratory", icon: "FlaskConical" },
    { label: "Enter Results", path: "/laboratory", icon: "FileText" },
    { label: "Verify Results", path: "/laboratory", icon: "CheckCircle" },
    { label: "Critical Results", path: "/laboratory", icon: "AlertTriangle" },
  ],
  CASHIER: [
    { label: "Outstanding Invoices", path: "/billing", icon: "Receipt" },
    { label: "Record Payment", path: "/billing", icon: "CreditCard" },
    { label: "Today's Revenue", path: "/reports", icon: "BarChart3" },
    { label: "Patients", path: "/patients", icon: "Users" },
  ],
  ADMIN: [
    { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { label: "Staff Management", path: "/staff", icon: "UserCog" },
    { label: "Reports", path: "/reports", icon: "BarChart3" },
    { label: "Settings", path: "/settings", icon: "Settings" },
  ],
  MANAGER: [
    { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { label: "Reports", path: "/reports", icon: "BarChart3" },
    { label: "Staff", path: "/staff", icon: "UserCog" },
    { label: "Billing", path: "/billing", icon: "Receipt" },
  ],
  RECORDS_OFFICER: [
    { label: "Patients", path: "/patients", icon: "Users" },
    { label: "Medical Records", path: "/patients", icon: "FileText" },
    { label: "Documents", path: "/patients", icon: "Folder" },
    { label: "Reports", path: "/reports", icon: "BarChart3" },
  ],
};
