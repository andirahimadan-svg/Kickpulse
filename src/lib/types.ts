// ─── HealthOS Core Types ────────────────────────────────────────────────────

export type UserRole =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "RECEPTIONIST"
  | "PHARMACIST"
  | "LAB_TECHNICIAN"
  | "CASHIER"
  | "RECORDS_OFFICER"
  | "MANAGER";

export interface Organization {
  id: string;
  name: string;
  type: "clinic" | "medical_center" | "hospital";
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  organizationId: string;
}

export interface Patient {
  id: string;
  medicalRecordNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  sex: "male" | "female" | "other";
  phone: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  allergies: string[];
  bloodType?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  registeredAt: string;
  lastVisit?: string;
  status: "active" | "inactive";
  assignedDoctor?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: "consultation" | "follow_up" | "emergency" | "lab" | "procedure";
  status: "scheduled" | "checked_in" | "in_progress" | "completed" | "cancelled" | "no_show";
  reason?: string;
  notes?: string;
}

export interface Visit {
  id: string;
  patientId: string;
  appointmentId?: string;
  doctorId: string;
  doctorName: string;
  date: string;
  reason: string;
  chiefComplaint?: string;
  history?: string;
  vitals?: Vitals;
  examination?: string;
  assessment?: string;
  diagnosis?: string[];
  status: "in_progress" | "completed" | "cancelled";
}

export interface Vitals {
  temperature?: number;
  heartRate?: number;
  bloodPressure?: string;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
}

export interface LabOrder {
  id: string;
  patientId: string;
  patientName: string;
  visitId: string;
  orderedBy: string;
  orderedByName: string;
  testName: string;
  testType: "blood" | "urine" | "imaging" | "other";
  status: "pending" | "sample_collected" | "processing" | "ready" | "critical" | "verified";
  requestedAt: string;
  result?: string;
  resultDate?: string;
  verifiedBy?: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  visitId: string;
  doctorId: string;
  doctorName: string;
  medications: PrescriptionItem[];
  status: "pending" | "dispensed" | "partial" | "cancelled";
  issuedAt: string;
  dispensedAt?: string;
  notes?: string;
}

export interface PrescriptionItem {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  dispensed?: boolean;
}

export interface Notification {
  id: string;
  type: "clinical" | "operational" | "administrative" | "system";
  title: string;
  message: string;
  actionUrl?: string;
  read: boolean;
  createdAt: string;
}

export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  position: number;
  checkInTime: string;
  department: string;
  type: "walk_in" | "appointment" | "emergency";
  status: "waiting" | "with_doctor" | "completed";
  priority: "normal" | "urgent" | "emergency";
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles: UserRole[];
  badge?: number;
}

// ─── Dashboard Metrics ──────────────────────────────────────────────────────

export interface MetricCard {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: "brand" | "success" | "warning" | "critical" | "info";
}
