import {
  createContext,
  useContext,
  useState,
} from "react";
import "../Components/Toast/Toast.css";
const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
      }}
    >
      {children}

      {toast && (
        <div
          className={`toast-notification ${toast.type}`}
        >
          <span className="toast-icon">
            {toast.type === "success"
              ? "✓"
              : toast.type === "error"
              ? "!"
              : "i"}
          </span>

          <span className="toast-message">
            {toast.message}
          </span>

          <button
            className="toast-close"
            onClick={hideToast}
          >
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export default ToastProvider;