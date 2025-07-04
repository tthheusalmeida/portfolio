import { toast as baseToast, ToastOptions } from "react-hot-toast";
import { HiCheckCircle, HiInformationCircle, HiRefresh } from "react-icons/hi";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { mergeClassNames } from "@/utils/classNames";

const typeStyles: Record<string, string> = {
  success:
    "border-[var(--color-foreground)]/25 bg-transparent backdrop-blur-3xl",
  error: "border-[var(--color-foreground)]/25 bg-transparent backdrop-blur-3xl",
  loading:
    "border-[var(--color-foreground)]/25 bg-transparent backdrop-blur-3xl",
  info: "border-[var(--color-foreground)]/25 bg-transparent backdrop-blur-3xl",
};

const typeIcons: Record<string, React.ReactNode> = {
  success: <HiCheckCircle className="w-5 h-5 mt-1 text-green-400" />,
  error: (
    <BsFillExclamationTriangleFill className="w-5 h-5 mt-1 text-red-400" />
  ),
  loading: <HiRefresh className="w-5 h-5 mt-1 animate-spin text-green-400" />,
  info: <HiInformationCircle className="w-5 h-5 mt-1 text-blue-400" />,
};

function showToast(
  type: "success" | "error" | "info" | "loading",
  message: string,
  options?: ToastOptions
) {
  return baseToast.custom(
    (t) => (
      <div
        className={mergeClassNames(
          "flex items-start gap-3",
          "rounded-lg shadow-md p-2 px-4 w-full max-w-sm border-2",
          t.visible ? "animate-enter" : "animate-leave",
          typeStyles[type]
        )}
        onClick={() => baseToast.dismiss(t.id)}
      >
        {typeIcons[type]}
        <div className="text-sm font-medium my-1">{message}</div>
        <button
          onClick={() => baseToast.dismiss(t.id)}
          className="ml-auto text-xs text-gray-200 mt-0.5"
          aria-label="Close notification"
        >
          <IoCloseSharp size={24} />
        </button>
      </div>
    ),
    options
  );
}

export const Toast = {
  success: (msg: string, opts?: ToastOptions) =>
    showToast("success", msg, opts),
  error: (msg: string, opts?: ToastOptions) => showToast("error", msg, opts),
  info: (msg: string, opts?: ToastOptions) => showToast("info", msg, opts),
  loading: (msg: string, opts?: ToastOptions) =>
    showToast("loading", msg, opts),
};
