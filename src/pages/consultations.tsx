// ─── Consultations Page ─────────────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  ArrowLeft,
  Save,
  FlaskConical,
  Pill,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { QUEUE, PATIENTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "reason", label: "Reason for Visit" },
  { id: "history", label: "History" },
  { id: "vitals", label: "Vitals" },
  { id: "examination", label: "Examination" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "orders", label: "Orders" },
  { id: "prescription", label: "Prescription" },
];

export default function ConsultationsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("reason");

  // Pick the first in-progress or waiting patient from queue
  const currentPatient = QUEUE[0]
    ? PATIENTS.find((p) => p.id === QUEUE[0].patientId)
    : null;

  const [notes, setNotes] = useState({
    reason: "",
    history: "",
    examination: "",
    diagnosis: "",
  });

  const [vitals, setVitals] = useState({
    temperature: "",
    heartRate: "",
    bloodPressure: "",
    respiratoryRate: "",
    oxygenSaturation: "",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!currentPatient) {
    return (
      <div>
        <PageHeader title="Consultations" description="No active consultation" />
        <Card className="text-center py-12">
          <Stethoscope size={32} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-sm text-neutral-500 mb-1">No patients in queue</p>
          <p className="text-xs text-neutral-400 mb-4">
            Check the patient queue to start a consultation.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/queue")}
          >
            View Queue
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-xl font-bold text-neutral-900">
            Consultation
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <Avatar name={`${currentPatient.firstName} ${currentPatient.lastName}`} size="sm" />
            <span className="text-sm text-neutral-600">
              {currentPatient.firstName} {currentPatient.lastName}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {currentPatient.medicalRecordNumber}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-emerald-600 font-medium"
            >
              Saved just now
            </motion.span>
          )}
          <Button
            variant="ghost"
            size="sm"
            icon={<Save size={16} />}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section navigation */}
        <div className="lg:col-span-1">
          <Card padding="sm">
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                    activeSection === s.id
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-neutral-600 hover:bg-neutral-50",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </nav>

            {/* Quick actions */}
            <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={<FlaskConical size={14} />}
                onClick={() => navigate("/laboratory")}
              >
                Request Lab Test
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={<Pill size={14} />}
              >
                Add Prescription
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                icon={<CalendarCheck size={14} />}
              >
                Schedule Follow-up
              </Button>
            </div>
          </Card>
        </div>

        {/* Section content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {activeSection === "reason" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  Reason for Visit
                </h2>
                <Input
                  label="Chief Complaint"
                  placeholder="Describe the main reason for today's visit..."
                  value={notes.reason}
                  onChange={(e) =>
                    setNotes((prev) => ({ ...prev, reason: e.target.value }))
                  }
                />
              </Card>
            )}

            {activeSection === "history" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  History
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-1 block">
                      Present Illness History
                    </label>
                    <textarea
                      className="w-full h-32 px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="Describe the history of the present illness..."
                      value={notes.history}
                      onChange={(e) =>
                        setNotes((prev) => ({ ...prev, history: e.target.value }))
                      }
                    />
                  </div>
                  {currentPatient.allergies.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">
                        ⚠ Known Allergies: {currentPatient.allergies.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {activeSection === "vitals" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  Vitals
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Input
                    label="Temperature (°C)"
                    type="number"
                    step="0.1"
                    placeholder="36.5"
                    value={vitals.temperature}
                    onChange={(e) =>
                      setVitals((prev) => ({ ...prev, temperature: e.target.value }))
                    }
                  />
                  <Input
                    label="Heart Rate (bpm)"
                    type="number"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={(e) =>
                      setVitals((prev) => ({ ...prev, heartRate: e.target.value }))
                    }
                  />
                  <Input
                    label="Blood Pressure"
                    placeholder="120/80"
                    value={vitals.bloodPressure}
                    onChange={(e) =>
                      setVitals((prev) => ({ ...prev, bloodPressure: e.target.value }))
                    }
                  />
                  <Input
                    label="Respiratory Rate"
                    type="number"
                    placeholder="16"
                    value={vitals.respiratoryRate}
                    onChange={(e) =>
                      setVitals((prev) => ({ ...prev, respiratoryRate: e.target.value }))
                    }
                  />
                  <Input
                    label="SpO₂ (%)"
                    type="number"
                    placeholder="98"
                    value={vitals.oxygenSaturation}
                    onChange={(e) =>
                      setVitals((prev) => ({ ...prev, oxygenSaturation: e.target.value }))
                    }
                  />
                </div>
              </Card>
            )}

            {activeSection === "examination" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  Clinical Examination
                </h2>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1 block">
                    Examination Findings
                  </label>
                  <textarea
                    className="w-full h-32 px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="Document examination findings..."
                    value={notes.examination}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, examination: e.target.value }))
                    }
                  />
                </div>
              </Card>
            )}

            {activeSection === "diagnosis" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  Assessment & Diagnosis
                </h2>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1 block">
                    Assessment
                  </label>
                  <textarea
                    className="w-full h-24 px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none mb-4"
                    placeholder="Clinical assessment..."
                    value={notes.diagnosis}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, diagnosis: e.target.value }))
                    }
                  />
                  <Input
                    label="Primary Diagnosis"
                    placeholder="e.g., Essential Hypertension"
                  />
                </div>
              </Card>
            )}

            {activeSection === "orders" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  Orders
                </h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    icon={<FlaskConical size={16} />}
                    onClick={() => navigate("/laboratory")}
                  >
                    Request Lab Test
                  </Button>
                  <div className="p-4 bg-neutral-50 rounded-lg text-center">
                    <p className="text-sm text-neutral-500">
                      No orders placed for this visit yet.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === "prescription" && (
              <Card>
                <h2 className="text-base font-semibold text-neutral-900 mb-4">
                  Prescription
                </h2>
                <div className="space-y-3">
                  <Button variant="outline" icon={<Pill size={16} />}>
                    Add Medication
                  </Button>
                  <div className="p-4 bg-neutral-50 rounded-lg text-center">
                    <p className="text-sm text-neutral-500">
                      No medications prescribed for this visit yet.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
