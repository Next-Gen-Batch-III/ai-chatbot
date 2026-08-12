import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ResetPasswordImg from "../../assets/images/ResetPassword.png";

const ResetPassword = ({
  onResetPassword,
  loading,
  error,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    onResetPassword(newPassword);
  };

  return (
    <div className="w-full max-w-sm">

      {/* RESET PASSWORD CARD */}
      <div
        className="
          w-full
          rounded-xl
          bg-white
          text-center
          shadow-lg
          md:rounded-2xl
          md:shadow-xl
        "
      >
        <div className="p-6">

          {/* ILLUSTRATION */}
          <img
            src={ResetPasswordImg}
            alt="Reset Password Illustration"
            className="
              mx-auto
              h-36
              w-auto
              md:h-24
            "
          />

          {/* TITLE */}
          <h2
            className="
              mt-3
              whitespace-nowrap
              text-3xl
              font-bold
              text-black
              md:mt-2
              md:text-2xl
            "
          >
            Reset your password
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-2
              text-sm
              text-gray-500
              md:mt-1
              md:text-xs
            "
          >
            Enter a new password below to change your password
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              mt-7
              space-y-4
              text-left
              md:mt-5
              md:space-y-3
            "
          >

            {/* NEW PASSWORD */}
            <div>
              <label
                htmlFor="newPassword"
                className="
                  mb-2
                  block
                  text-base
                  font-medium
                  text-gray-600
                  md:mb-1
                  md:text-xs
                "
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    pr-11
                    text-base
                    text-gray-800
                    outline-none
                    placeholder:text-gray-400
                    focus:border-[#3B98FF]
                    disabled:bg-gray-100
                    md:px-3
                    md:py-2
                    md:pr-10
                    md:text-sm
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-600
                  "
                  tabIndex="-1"
                >
                  {showNewPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  mb-2
                  block
                  text-base
                  font-medium
                  text-gray-600
                  md:mb-1
                  md:text-xs
                "
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Enter your password again"
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    pr-11
                    text-base
                    text-gray-800
                    outline-none
                    placeholder:text-gray-400
                    focus:border-[#3B98FF]
                    disabled:bg-gray-100
                    md:px-3
                    md:py-2
                    md:pr-10
                    md:text-sm
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-600
                  "
                  tabIndex="-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* RESET PASSWORD BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-lg
                bg-[#3B98FF]
                py-3.5
                text-base
                font-medium
                text-white
                transition-colors
                hover:bg-[#2f86e6]
                disabled:cursor-not-allowed
                disabled:opacity-60
                md:rounded-none
                md:py-2.5
                md:text-sm
              "
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;