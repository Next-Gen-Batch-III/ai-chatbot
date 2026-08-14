import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import OtpVerification from "../components/auth/OtpVerification";
import ResetPassword from "../components/auth/ResetPassword";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email ?? "";
  const initialMode = location.state?.mode ?? "verify-code";

  const { signIn, setActive, isLoaded } = useSignIn();

  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetCode, setResetCode] = useState("");

  const handleVerify = async (code) => {
    if (!isLoaded) return;

    setError("");
    setResetCode(code);
    setMode("set-password");
  };

  const handleResend = async () => {
    if (!isLoaded || !email) return;

    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Couldn't resend the code. Try again.");
    }
  };

  const handleResetPassword = async (newPassword) => {
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: resetCode,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Unable to reset password. Please try again.");
      }
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#3B98FF] px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-black/5">
          <h3 className="text-base font-bold text-gray-900">Reset Password</h3>
          <p className="mt-2 text-sm text-gray-500">
            Start the reset flow first so we can send a verification code to your email.
          </p>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="mt-4 w-full rounded-lg bg-[#3B98FF] py-2.5 text-sm font-semibold text-white hover:bg-[#2f86e6]"
          >
            Go to Forgot Password
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3B98FF] px-4">
      {mode === "verify-code" ? (
        <OtpVerification
          email={email}
          onVerify={handleVerify}
          onResend={handleResend}
          onBackToLogin={() => navigate("/login")}
          loading={loading}
          error={error}
        />
      ) : (
        <ResetPassword
          onResetPassword={handleResetPassword}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}
