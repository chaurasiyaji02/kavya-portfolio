import { CheckCircle2, X, XCircle } from 'lucide-react';

function AdminToast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  const Icon = toast.type === 'error' ? XCircle : CheckCircle2;

  return (
    <div
      className={`fixed right-4 top-24 z-[70] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-glass backdrop-blur-xl ${
        toast.type === 'error'
          ? 'border-rose-300/60 bg-rose-50/95 text-rose-900 dark:border-rose-400/30 dark:bg-rose-950/90 dark:text-rose-100'
          : 'border-teal-300/60 bg-teal-50/95 text-teal-900 dark:border-teal-400/30 dark:bg-teal-950/90 dark:text-teal-100'
      }`}
      role="status"
    >
      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 text-sm font-medium leading-6">{toast.message}</p>
      <button
        aria-label="Dismiss notification"
        className="focus-ring grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        type="button"
        onClick={onClose}
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}

export default AdminToast;
