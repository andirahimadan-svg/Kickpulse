// ─── HealthOS Application ───────────────────────────────────────────────────
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/app-layout";

// Pages
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import PatientsPage from "@/pages/patients";
import PatientProfilePage from "@/pages/patient-profile";
import PatientRegisterPage from "@/pages/patient-register";
import AppointmentsPage from "@/pages/appointments";
import ConsultationsPage from "@/pages/consultations";
import LaboratoryPage from "@/pages/laboratory";
import PharmacyPage from "@/pages/pharmacy";
import QueuePage from "@/pages/queue";
import BillingPage from "@/pages/billing";
import StaffPage from "@/pages/staff";
import ReportsPage from "@/pages/reports";
import NotificationsPage from "@/pages/notifications";
import SettingsPage from "@/pages/settings";
import MorePage from "@/pages/more";
import NotFoundPage from "@/pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Patients */}
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/new" element={<PatientRegisterPage />} />
          <Route path="/patients/:id" element={<PatientProfilePage />} />

          {/* Appointments */}
          <Route path="/appointments" element={<AppointmentsPage />} />

          {/* Clinical */}
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/queue" element={<QueuePage />} />

          {/* Lab & Pharmacy */}
          <Route path="/laboratory" element={<LaboratoryPage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />

          {/* Admin */}
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/reports" element={<ReportsPage />} />

          {/* System */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/more" element={<MorePage />} />
        </Route>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
