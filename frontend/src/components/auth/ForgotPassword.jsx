import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ForgotPasswordImg from "../../assets/images/ForgotPassword.png";

const ForgotPassword = ({
  onReturnToLogin,
  onSendCode,
  loading,
  error,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    // Send email to AuthModal
    onSendCode(email);
  };

  return (
    <div className="w-full max-w-sm">
      
      {/* FORGOT PASSWORD CARD */}
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
            src={ForgotPasswordImg}
            alt="Forgot Password Illustration"
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
            Forgot Password
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
            Enter your email to receive a verification code.
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
              space-y-5
              text-left
              md:mt-5
              md:space-y-3
            "
          >

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
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
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={loading}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-base
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[#3B98FF]
                  disabled:bg-gray-100
                  md:px-3
                  md:py-2
                  md:text-sm
                "
              />
            </div>

            {/* SEND VERIFICATION CODE */}
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
              {loading ? "Sending..." : "Send Verification Code"}

              {!loading && (
                <ArrowRight
                  size={18}
                  className="ml-2 md:size-[14px]"
                />
              )}
            </button>

            {/* RETURN TO LOGIN */}
            <button
              type="button"
              onClick={onReturnToLogin}
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-lg
                border
                border-gray-400
                bg-white
                py-3.5
                text-base
                font-medium
                text-gray-700
                transition-colors
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-60
                md:rounded-none
                md:py-2.5
                md:text-sm
              "
            >
              <ArrowLeft
                size={18}
                className="mr-2 md:size-[14px]"
              />

              Return to Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;