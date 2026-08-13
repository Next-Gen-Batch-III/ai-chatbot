import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async ({ fullName, email, password }) => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);
    try {
      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      await signUp.create({ firstName, lastName, emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigate("/verify-email", { state: { email } });
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3B98FF] px-4">
      <SignUpForm
        onSubmit={handleSignUp}
        onSwitchToLogin={() => navigate("/login")}
        loading={loading}
        error={error}
      />
    </div>
  );
}