import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import OtpVerification from "./OtpVerification";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

export default function AuthModal({
  onClose,
  initialStep = "signup",
}) {
  const [step, setStep] = useState(initialStep);
  const [pendingEmail, setPendingEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    signIn,
    setActive: setActiveSignIn,
    isLoaded: signInLoaded,
  } = useSignIn();

  const {
    signUp,
    setActive: setActiveSignUp,
    isLoaded: signUpLoaded,
  } = useSignUp();


  const resetError = () => {
    setError("");
  };

  const goToStep = (nextStep) => {
    resetError();
    setStep(nextStep);
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async ({ email, password }) => {
    if (!signInLoaded) return;

    resetError();
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActiveSignIn({
          session: result.createdSessionId,
        });

        onClose?.();
      } else {
        setError(
          "Unable to log in. Please check your details and try again."
        );
      }
    } catch (err) {
      setError(
        err?.errors?.[0]?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SIGN UP
  // =========================

  const handleSignUp = async ({
    fullName,
    email,
    password,
  }) => {
    if (!signUpLoaded) return;

    resetError();
    setLoading(true);

    try {
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ");

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingEmail(email);
      setStep("otp");
    } catch (err) {
      setError(
        err?.errors?.[0]?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SIGN UP OTP
  // =========================

  const handleVerify = async (code) => {
    if (!signUpLoaded) return;

    resetError();
    setLoading(true);

    try {
      const result =
        await signUp.attemptEmailAddressVerification({
          code,
        });

      if (result.status === "complete") {
        await setActiveSignUp({
          session: result.createdSessionId,
        });

        onClose?.();
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      setError(
        err?.errors?.[0]?.message ||
          "Invalid code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESEND SIGN UP OTP
  // =========================

  const handleResend = async () => {
    if (!signUpLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err) {
      setError(
        err?.errors?.[0]?.message ||
          "Couldn't resend the code. Try again."
      );
    }
  };

  const handleForgotPassword = (email) => {
    setPendingEmail(email);

    goToStep("reset-otp");
  };

  // =========================
  // RESET PASSWORD OTP
  // =========================

  const handleResetOtp = (code) => {
    console.log("Reset password OTP:", code);

    // UI testing only.
    // Any 6-digit code moves to Reset Password.
    goToStep("reset-password");
  };

  // =========================
  // RESET PASSWORD
  // =========================

  const handleResetPassword = (password) => {
    console.log("New password:", password);

    alert("Password reset flow completed!");

    goToStep("login");
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#3B98FF]
        px-4
      "
      onClick={onClose}
    >

      {/* ===================
      MOBILE WHITE WAVY AREA
      =======================*/}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[60%]
          w-full
          bg-white
          md:hidden
        "
        style={{
          clipPath:
            "polygon(0 12%, 5% 17%, 10% 13%, 15% 18%, 20% 14%, 25% 19%, 30% 15%, 35% 20%, 40% 16%, 45% 21%, 50% 17%, 55% 22%, 60% 18%, 65% 23%, 70% 19%, 75% 24%, 80% 20%, 85% 25%, 90% 21%, 95% 26%, 100% 20%, 100% 100%, 0 100%)",
        }}
      />

      {/* =========================
          CONTENT
          ========================= */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-sm
          items-center
          justify-center
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* =====================================
            LOGIN
            ===================================== */}

        {step === "login" && (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToSignUp={() =>
              goToStep("signup")
            }
            onForgotPassword={() =>
              goToStep("forgot-password")
            }
            loading={loading}
            error={error}
          />
        )}

        {/* =====================================
            FORGOT PASSWORD
            ===================================== */}

        {step === "forgot-password" && (
          <ForgotPassword
            onReturnToLogin={() =>
              goToStep("login")
            }
            onSendCode={handleForgotPassword}
            loading={loading}
            error={error}
          />
        )}

        {/* =====================================
            SIGN UP
            ===================================== */}

        {step === "signup" && (
          <SignUpForm
            onSubmit={handleSignUp}
            onSwitchToLogin={() =>
              goToStep("login")
            }
            loading={loading}
            error={error}
          />
        )}

        {/* =====================================
            SIGN UP OTP
            ===================================== */}

        {step === "otp" && (
          <OtpVerification
            email={pendingEmail}
            onVerify={handleVerify}
            onResend={handleResend}
            onBackToLogin={() =>
              goToStep("login")
            }
            loading={loading}
            error={error}
          />
        )}

        {/* =====================================
            RESET PASSWORD OTP
            ===================================== */}

        {step === "reset-otp" && (
          <OtpVerification
            email={pendingEmail}
            onVerify={handleResetOtp}
            onResend={() => {
              console.log(
                "Resend reset OTP to:",
                pendingEmail
              );
            }}
            onBackToLogin={() =>
              goToStep("login")
            }
            loading={loading}
            error={error}
          />
        )}

        {/* =====================================
            RESET PASSWORD
            ===================================== */}

        {step === "reset-password" && (
          <ResetPassword
            onSubmit={handleResetPassword}
            onBackToLogin={() =>
              goToStep("login")
            }
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}