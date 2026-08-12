import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LogoImg from "../../assets/images/logo.png";

export default function SignUpForm({ onSubmit, onSwitchToLogin, loading, error }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const passwordsMatch = password && password === confirmPassword;
  const canSubmit = fullName.trim() && email.trim() && passwordsMatch && agreed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.({ fullName: fullName.trim(), email: email.trim(), password });
  };

  return (
    <div className="w-95 max-w-[92vw] rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-black/5">
      <img src={LogoImg} alt="Logo" className="mx-auto h-10 w-auto" />

      <h3 className="mt-3 text-base font-bold text-gray-900">Get start with your account</h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">
        Your intelligent learning companion. Sign in to explore DMIL concepts, generate ideas, and learn with confidence.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-left">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800
                       placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800
                       placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-9 text-sm text-gray-800
                         placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your password again"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-9 text-sm text-gray-800
                         placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-[11px] text-red-500">Passwords do not match</p>
          )}
        </div>

        <label className="flex items-start gap-2 pt-1 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#3B98FF] focus:ring-[#3B98FF]"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-[#3B98FF] hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-[#3B98FF] hover:underline">Privacy Policy</a>
          </span>
        </label>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="w-full border border-[#3B98FF] bg-[#3B98FF] py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(59,152,255,0.35)]
                     transition-colors hover:bg-[#2f86e6] disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="font-medium text-[#3B98FF] hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
}