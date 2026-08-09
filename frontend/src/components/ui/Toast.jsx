import { createContext, useCallback, useEffect, useState } from "react";
import { X, CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CONFIGS = {
  error: {
    icon: CircleAlert,
    container: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    text: "text-red-800",
    bar: "bg-red-400",
  },
  success: {
    icon: CircleCheck,
    container: "bg-green-50 border-green-200",
    iconColor: "text-green-500",
    text: "text-green-800",
    bar: "bg-green-400",
  },
  warning: {
    icon: TriangleAlert,
    container: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-500",
    text: "text-yellow-800",
    bar: "bg-yellow-400",
  },
  info: {
    icon: Info,
    container: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500",
    text: "text-blue-800",
    bar: "bg-blue-400",
  },
};

const DEFAULT_DURATION = 4000;

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const cfg = CONFIGS[toast.type] ?? CONFIGS.info;
  const Icon = cfg.icon;


  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration ?? DEFAULT_DURATION);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);


  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };


  return (
    <div
      className={`
        flex w-80 items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg
        transition-all duration-300
        ${cfg.container}
        ${visible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}
      `}
    >
      <Icon size={16} className={`mt-0.5 shrink-0 ${cfg.iconColor}`} />

      <p className={`flex-1 text-sm leading-snug ${cfg.text}`}>
        {toast.message}
      </p>

      <button
        onClick={handleClose}
        className={`shrink-0 opacity-50 transition-opacity hover:opacity-100 ${cfg.text}`}
      >
        <X size={14} />
      </button>
    </div>
  );
}

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration) => {
    setToasts((prev) => [
      ...prev,
      { id: crypto.randomUUID(), message, type, duration },
    ]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed right-4 bottom-4 z-[999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}



export { ToastContext };
