import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <SignUp routing="hash" />
    </div>
  );
}
