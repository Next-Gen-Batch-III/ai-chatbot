import { useRef, useState } from "react";
import { MailCheck, ArrowLeft } from "lucide-react";

export default function OtpVerification({
  email,
  onVerify,
  onResend,
  onBackToLogin,
  loading,
  error,
}) {
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const code = digits.join("");
  const canSubmit = code.length === 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onVerify?.(code);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
      <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
        <MailCheck size={22} className="text-[#3B98FF]" />
      </div>

      <h3 className="mt-3 text-base font-bold text-gray-900">Verify your email</h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">
        We sent a 6 digit code to{" "}
        <span className="font-medium text-gray-700">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex justify-center gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-11 w-9 rounded-lg border border-gray-200 text-center text-sm font-semibold text-gray-800 outline-none focus:border-[#3B98FF]" />
          ))}
        </div>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="mt-5 w-full bg-[#3B98FF] py-2.5 text-sm font-medium text-white
                     transition-colors hover:bg-[#2f86e6] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500">
        Don't receive the code?{" "}
        <button onClick={onResend} className="font-medium text-[#3B98FF] hover:underline"> Resend Code </button>
      </p>

      <button onClick={onBackToLogin} className="mt-2 flex items-center justify-center gap-1 mx-auto text-xs text-gray-400 hover:text-gray-600">
        <ArrowLeft size={14} />
        Back to Login
      </button>
    </div>
  );
}