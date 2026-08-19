// ─── Patient Registration Page ──────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

const STEPS = [
  { id: "identity", title: "Identity", description: "Basic personal information" },
  { id: "contact", title: "Contact", description: "Phone, email, and address" },
  { id: "demographics", title: "Demographics", description: "Medical and insurance details" },
  { id: "emergency", title: "Emergency Contact", description: "Who to contact in emergencies" },
  { id: "review", title: "Review", description: "Confirm all information" },
];

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string;
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const initialData: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  sex: "",
  phone: "",
  email: "",
  address: "",
  bloodType: "",
  allergies: "",
  insuranceProvider: "",
  insuranceNumber: "",
  emergencyContact: "",
  emergencyPhone: "",
};

export default function PatientRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 0) return data.firstName && data.lastName && data.dateOfBirth && data.sex;
    if (step === 1) return data.phone;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    navigate("/patients");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        icon={<ArrowLeft size={16} />}
        className="mb-4"
      >
        Back
      </Button>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        Register New Patient
      </h1>
      <p className="text-sm text-neutral-500 mb-6">
        Step {step + 1} of {STEPS.length} — {STEPS[step].description}
      </p>

      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-200",
              i <= step ? "bg-emerald-600" : "bg-neutral-200",
            )}
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
        >
          {step === 0 && (
            <Card>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  Identity
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    value={data.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    autoFocus
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    value={data.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={data.dateOfBirth}
                    onChange={(e) => update("dateOfBirth", e.target.value)}
                  />
                  <Select
                    label="Sex"
                    placeholder="Select sex"
                    value={data.sex}
                    onChange={(e) => update("sex", e.target.value)}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>
              </div>
            </Card>
          )}

          {step === 1 && (
            <Card>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  Contact Information
                </h2>
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  autoFocus
                />
                <Input
                  label="Email (optional)"
                  type="email"
                  placeholder="patient@email.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                />
                <Input
                  label="Address (optional)"
                  placeholder="Street address, city"
                  value={data.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  Demographics
                </h2>
                <Select
                  label="Blood Type (optional)"
                  placeholder="Select blood type"
                  value={data.bloodType}
                  onChange={(e) => update("bloodType", e.target.value)}
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ]}
                />
                <Input
                  label="Known Allergies (optional)"
                  placeholder="e.g., Penicillin, Aspirin"
                  value={data.allergies}
                  onChange={(e) => update("allergies", e.target.value)}
                />
                <Input
                  label="Insurance Provider (optional)"
                  placeholder="e.g., NHIF, Jubilee"
                  value={data.insuranceProvider}
                  onChange={(e) => update("insuranceProvider", e.target.value)}
                />
                <Input
                  label="Insurance Number (optional)"
                  placeholder="Insurance member number"
                  value={data.insuranceNumber}
                  onChange={(e) => update("insuranceNumber", e.target.value)}
                />
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  Emergency Contact
                </h2>
                <Input
                  label="Contact Name (optional)"
                  placeholder="Full name"
                  value={data.emergencyContact}
                  onChange={(e) => update("emergencyContact", e.target.value)}
                />
                <Input
                  label="Contact Phone (optional)"
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={data.emergencyPhone}
                  onChange={(e) => update("emergencyPhone", e.target.value)}
                />
              </div>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  Review Information
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Name", value: `${data.firstName} ${data.lastName}` },
                    { label: "Date of Birth", value: data.dateOfBirth || "—" },
                    { label: "Sex", value: data.sex || "—" },
                    { label: "Phone", value: data.phone || "—" },
                    { label: "Email", value: data.email || "—" },
                    { label: "Address", value: data.address || "—" },
                    { label: "Blood Type", value: data.bloodType || "—" },
                    { label: "Allergies", value: data.allergies || "None" },
                    { label: "Insurance", value: data.insuranceProvider || "—" },
                    { label: "Emergency Contact", value: data.emergencyContact || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <span className="text-sm text-neutral-500">{label}</span>
                      <span className="text-sm font-medium text-neutral-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          onClick={() => (step === 0 ? navigate(-1) : setStep(step - 1))}
          icon={<ArrowLeft size={16} />}
        >
          {step === 0 ? "Cancel" : "Previous"}
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            icon={<ArrowRight size={16} />}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={loading}
            icon={<Check size={16} />}
          >
            Register Patient
          </Button>
        )}
      </div>
    </div>
  );
}
