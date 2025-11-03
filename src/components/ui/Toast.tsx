import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const backgrounds = {
    success: 'bg-green-50 dark:bg-green-900 border-green-500',
    error: 'bg-red-50 dark:bg-red-900 border-red-500',
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-500',
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg ${backgrounds[type]} animate-slide-in`}>
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {message}
      </p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Container para múltiplos toasts
interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
