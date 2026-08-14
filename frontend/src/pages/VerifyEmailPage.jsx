import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import OtpVerification from "../components/auth/OtpVerification";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";

  const { signUp, setActive, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (code) => {
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;

    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Couldn't resend the code. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3B98FF] px-4">
      <OtpVerification
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        onBackToLogin={() => navigate("/login")}
        loading={loading}
        error={error}
      />
    </div>
  );
}
