// ─── Patient Profile Page ───────────────────────────────────────────────────
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Calendar,
  Stethoscope,
  FlaskConical,
  Pill,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";

import {
  getPatient,
  getPatientVisits,
  getPatientAppointments,
  getPatientLabOrders,
  getPatientPrescriptions,
  getPatientFullName,
} from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const TABS = ["Overview", "Visits", "Lab Results", "Prescriptions", "Appointments"] as const;

export default function PatientProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");

  const patient = id ? getPatient(id) : undefined;
  if (!patient) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate(-1)} icon={<ArrowLeft size={16} />}>
          Back
        </Button>
        <EmptyState
          icon={<FileText size={24} />}
          title="Patient not found"
          description="This patient record could not be found."
        />
      </div>
    );
  }

  const visits = getPatientVisits(patient.id);
  const appointments = getPatientAppointments(patient.id);
  const labOrders = getPatientLabOrders(patient.id);
  const prescriptions = getPatientPrescriptions(patient.id);

  return (
    <div>
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        icon={<ArrowLeft size={16} />}
        className="mb-4"
      >
        Back
      </Button>

      {/* Patient Header */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar name={getPatientFullName(patient)} size="xl" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-neutral-900">
                {getPatientFullName(patient)}
              </h1>
              <StatusBadge status={patient.status} />
            </div>
            <p className="text-sm text-neutral-500 font-mono mb-2">
              {patient.medicalRecordNumber}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
              <span>{patient.age} years • {patient.sex === "male" ? "Male" : "Female"}</span>
              <span>DOB: {patient.dateOfBirth}</span>
              {patient.bloodType && <span>Blood: {patient.bloodType}</span>}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Phone size={14} /> {patient.phone}
              </span>
              {patient.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} /> {patient.email}
                </span>
              )}
              {patient.address && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {patient.address}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Button
              icon={<Stethoscope size={16} />}
              onClick={() => navigate(`/consultations/new?patient=${patient.id}`)}
            >
              Start Visit
            </Button>
            <Button variant="outline" size="sm" icon={<Calendar size={14} />}>
              Book Appointment
            </Button>
          </div>
        </div>

        {/* Allergies Alert */}
        {patient.allergies.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Allergies</p>
              <p className="text-sm text-red-700">{patient.allergies.join(", ")}</p>
            </div>
          </div>
        )}

        {/* Insurance */}
        {patient.insuranceProvider && (
          <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
            <span>Insurance: <strong className="text-neutral-700">{patient.insuranceProvider}</strong></span>
            <span className="font-mono text-xs">{patient.insuranceNumber}</span>
          </div>
        )}
      </Card>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6 -mx-1 px-1">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors -mb-px",
                activeTab === tab
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300",
              )}
            >
              {tab}
              {tab === "Lab Results" && labOrders.length > 0 && (
                <span className="ml-1.5 bg-neutral-100 text-neutral-600 text-xs rounded-full px-1.5 py-0.5">
                  {labOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Recent Vitals */}
          {visits[0]?.vitals && (
            <Card>
              <h3 className="text-base font-semibold text-neutral-900 mb-4">
                Latest Vitals
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {visits[0].vitals.bloodPressure && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Blood Pressure</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {visits[0].vitals.bloodPressure}
                    </p>
                  </div>
                )}
                {visits[0].vitals.heartRate && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Heart Rate</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {visits[0].vitals.heartRate} <span className="text-sm font-normal text-neutral-400">bpm</span>
                    </p>
                  </div>
                )}
                {visits[0].vitals.temperature && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Temperature</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {visits[0].vitals.temperature}°C
                    </p>
                  </div>
                )}
                {visits[0].vitals.oxygenSaturation && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">SpO₂</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {visits[0].vitals.oxygenSaturation}%
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <h3 className="text-base font-semibold text-neutral-900 mb-4">Timeline</h3>
            {visits.length === 0 ? (
              <EmptyState
                icon={<Clock size={20} />}
                title="No visits yet"
                description="This patient has no recorded visits."
              />
            ) : (
              <div className="space-y-6">
                {visits.map((visit) => (
                  <div key={visit.id} className="relative pl-6">
                    <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="absolute left-[3px] top-3 w-px h-full bg-neutral-200 last:bg-transparent" />
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">{visit.date}</p>
                      <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                        Consultation — {visit.reason}
                      </h4>
                      {visit.chiefComplaint && (
                        <p className="text-sm text-neutral-600 mb-2">{visit.chiefComplaint}</p>
                      )}
                      {visit.diagnosis && visit.diagnosis.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {visit.diagnosis.map((d, i) => (
                            <Badge key={i} variant="info">{d}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {activeTab === "Visits" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {visits.length === 0 ? (
            <EmptyState
              icon={<Stethoscope size={24} />}
              title="No visits"
              description="No consultation records for this patient."
            />
          ) : (
            <div className="space-y-3">
              {visits.map((v) => (
                <Card key={v.id} className="cursor-pointer hover:border-neutral-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <Stethoscope size={16} className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-neutral-900">{v.reason}</p>
                        <StatusBadge status={v.status} />
                      </div>
                      <p className="text-xs text-neutral-500">
                        {v.date} • {v.doctorName}
                      </p>
                      {v.diagnosis && v.diagnosis.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {v.diagnosis.map((d, i) => (
                            <Badge key={i} variant="info">{d}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "Lab Results" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {labOrders.length === 0 ? (
            <EmptyState
              icon={<FlaskConical size={24} />}
              title="No lab results"
              description="No laboratory tests have been ordered for this patient."
            />
          ) : (
            <div className="space-y-3">
              {labOrders.map((lab) => (
                <Card key={lab.id} className="cursor-pointer hover:border-neutral-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <FlaskConical size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-neutral-900">{lab.testName}</p>
                        <StatusBadge status={lab.status} />
                      </div>
                      <p className="text-xs text-neutral-500">
                        {lab.requestedAt} • {lab.orderedByName}
                      </p>
                      {lab.result && (
                        <pre className="mt-2 p-2 bg-neutral-50 rounded text-xs text-neutral-700 font-mono whitespace-pre-wrap">
                          {lab.result}
                        </pre>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "Prescriptions" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {prescriptions.length === 0 ? (
            <EmptyState
              icon={<Pill size={24} />}
              title="No prescriptions"
              description="No prescriptions have been issued for this patient."
            />
          ) : (
            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <Card key={rx.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <Pill size={16} className="text-emerald-600" />
                    <p className="text-sm font-semibold text-neutral-900">
                      Prescription — {rx.issuedAt}
                    </p>
                    <StatusBadge status={rx.status} />
                  </div>
                  <div className="space-y-2">
                    {rx.medications.map((med) => (
                      <div key={med.id} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900">{med.medicationName}</p>
                          <p className="text-xs text-neutral-500">
                            {med.dosage} • {med.frequency} • {med.duration}
                          </p>
                        </div>
                        <span className="text-xs text-neutral-400">×{med.quantity}</span>
                      </div>
                    ))}
                  </div>
                  {rx.notes && (
                    <p className="mt-3 text-sm text-neutral-500 italic">{rx.notes}</p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "Appointments" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {appointments.length === 0 ? (
            <EmptyState
              icon={<Calendar size={24} />}
              title="No appointments"
              description="No appointments scheduled for this patient."
              action={
                <Button size="sm" icon={<Calendar size={14} />}>
                  Book Appointment
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <Card key={apt.id} className="flex items-center gap-4">
                  <div className="text-center min-w-[48px]">
                    <p className="text-sm font-semibold text-neutral-900">{apt.date}</p>
                    <p className="text-xs text-neutral-500">{apt.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{apt.reason}</p>
                    <p className="text-xs text-neutral-500">
                      {apt.doctorName} • {apt.type.replace("_", " ")}
                    </p>
                  </div>
                  <StatusBadge status={apt.status} />
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
