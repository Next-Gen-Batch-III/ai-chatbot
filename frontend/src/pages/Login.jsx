import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <SignIn 
        routing="hash" 
      />
    </div>
  );
}
