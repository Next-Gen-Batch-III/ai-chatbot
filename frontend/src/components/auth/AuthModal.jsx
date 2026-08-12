import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import OtpVerification from "./OtpVerification";

export default function AuthModal({ onClose, initialStep = "signup" }) {
  const [step, setStep] = useState(initialStep);
  const [pendingEmail, setPendingEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, setActive: setActiveSignIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setActiveSignUp, isLoaded: signUpLoaded } = useSignUp();

  const resetError = () => setError("");

  const goToStep = (nextStep) => {
    resetError();
    setStep(nextStep);
  };

  const handleLogin = async ({ email, password }) => {
    if (!signInLoaded) return;
    resetError();
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActiveSignIn({ session: result.createdSessionId });
        onClose?.();
      } else {
        setError("Unable to log in. Please check your details and try again.");
      }
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async ({ fullName, email, password }) => {
    if (!signUpLoaded) return;
    resetError();
    setLoading(true);
    try {
      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      await signUp.create({ firstName, lastName, emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingEmail(email);
      setStep("otp");
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code) => {
    if (!signUpLoaded) return;
    resetError();
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        onClose?.();
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
    if (!signUpLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Couldn't resend the code. Try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#3B98FF]"
    >
      <div className="relative min-h-screen w-full px-4 py-6 sm:px-8">
        <div className="absolute right-4 top-6 sm:right-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
            aria-label="Close auth"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-screen items-center justify-center">
        {step === "login" && (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToSignUp={() => goToStep("signup")}
            onForgotPassword={() => {

            }}
            loading={loading}
            error={error}
          />    
        )}

        {step === "signup" && (
          <SignUpForm
            onSubmit={handleSignUp}
            onSwitchToLogin={() => goToStep("login")}
            loading={loading}
            error={error}
          />
        )}

        {step === "otp" && (
          <OtpVerification
            email={pendingEmail}
            onVerify={handleVerify}
            onResend={handleResend}
            onBackToLogin={() => goToStep("login")}
            loading={loading}
            error={error}
          />
        )}

        </div>
      </div>
    </div>
  );
}