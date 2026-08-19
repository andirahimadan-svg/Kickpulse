// ─── Not Found Page ─────────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-neutral-200 mb-4">404</p>
      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
        Page not found
      </h2>
      <p className="text-sm text-neutral-500 mb-6 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button
        variant="outline"
        onClick={() => navigate("/dashboard")}
        icon={<ArrowLeft size={16} />}
      >
        Back to Dashboard
      </Button>
    </div>
  );
}
