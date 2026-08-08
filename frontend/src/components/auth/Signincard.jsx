import { FcGoogle } from "react-icons/fc";
 
export default function SignInCard({ onContinueWithGoogle }) {
  return (
    <div className="w-72 rounded-2xl bg-white p-5 text-center shadow-xl">
      <h3 className="text-base font-bold text-gray-900">Welcome to ChatBot-AI</h3>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        Your intelligent learning companion. Sign in to explore DMIL concepts,
        generate ideas, and learn with confidence.
      </p>
      <button
        onClick={onContinueWithGoogle}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#3B98FF]
                   py-2.5 text-sm font-medium text-white hover:bg-[#2f86e6] transition-colors"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
          <FcGoogle size={14} />
        </span>
        Continue with Google
      </button>
    </div>
  );
}