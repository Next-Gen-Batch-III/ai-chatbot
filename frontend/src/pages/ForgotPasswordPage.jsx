import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import ForgotPassword from "../components/auth/ForgotPassword";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { signIn, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async (email) => {
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      navigate("/reset-password", {
        state: {
          email,
          mode: "verify-code",
        },
      });
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Unable to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3B98FF] px-4">
      <ForgotPassword
        onReturnToLogin={() => navigate("/login")}
        onSendCode={handleSendCode}
        loading={loading}
        error={error}
      />
    </div>
  );
}
