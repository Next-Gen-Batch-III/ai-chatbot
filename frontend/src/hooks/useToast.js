import { useContext } from "react";
import { ToastContext } from "../components/ui/Toast";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");

  return {
    error:   (msg, duration) => ctx.addToast(msg, "error",   duration),
    success: (msg, duration) => ctx.addToast(msg, "success", duration),
    warning: (msg, duration) => ctx.addToast(msg, "warning", duration),
    info:    (msg, duration) => ctx.addToast(msg, "info",    duration),
  };
}
