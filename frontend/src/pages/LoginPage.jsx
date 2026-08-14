import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Unable to log in. Please check your details and try again.");
      }
    } catch (err) {
      setError(err?.errors?.[0]?.message ?? "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3B98FF] px-4">
      <LoginForm
        onSubmit={handleLogin}
        onSwitchToSignUp={() => navigate("/signup")}
        onForgotPassword={() => navigate("/forgot-password")}
        loading={loading}
        error={error}
      />
    </div>
  );
}