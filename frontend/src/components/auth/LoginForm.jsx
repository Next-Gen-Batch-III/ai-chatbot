import { useState } from "react";
import LogoImg from "../../assets/images/logo.png";

export default function LoginForm({
  onSubmit,
  onSwitchToSignUp,
  onForgotPassword,
  loading,
  error,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const canSubmit = email.trim() && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.({ email: email.trim(), password, rememberMe });
  };

  return (
    <div className="w-95 max-w-[92vw] overflow-hidden rounded-2xl bg-white text-center shadow-md ring-1 ring-black/5">
      <div className="p-6">
        <img src={LogoImg} alt="Logo" className="mx-auto h-10 w-auto" />

        <h3 className="mt-3 text-base font-bold text-gray-900">Welcome Back</h3>
        <p className="mt-1 text-xs text-gray-500">Login to your account</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-left">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
            />
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-1.5 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-[#3B98FF] focus:ring-[#3B98FF]"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-gray-500 hover:text-[#3B98FF] hover:underline"
            >
              Forgot password ?
            </button>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full border border-[#3B98FF] bg-[#3B98FF] py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(59,152,255,0.35)] transition-colors hover:bg-[#2f86e6] focus:outline-none focus:ring-2 focus:ring-white/60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs text-gray-600">
        Don't have an account yet ?{" "}
        <button
          onClick={onSwitchToSignUp}
          className="font-medium text-[#3B98FF] hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}