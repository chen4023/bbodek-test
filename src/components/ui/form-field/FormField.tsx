import type { FormFieldProps } from "./form-field.types";
import { cn } from "@/lib/utils";
import { useId } from "react";

export default function FormField({
  label,
  description,
  error,
  className,
  htmlFor,
  helperText,
  required = false,
  children,
}: FormFieldProps) {
  const id = htmlFor ?? useId();

  return (
    <div className={cn("relative w-full", className)}>
      {/* child input은 반드시 placeholder=" "와 peer 클래스가 있어야 함 */}
      {children}

      {/* Floating Label */}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "absolute text-gray-400 font-semibold top-4 left-5 text-xs",
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-primary">*</span>}
        </label>
      )}

      {/* description, helperText, error */}
      {helperText && (
        <p className="mt-1 text-xs text-gray-300">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 pl-3 text-xs text-red">{error}</p>
      )}
      {description && (
        <p className="mt-1 text-xs text-gray-400">{description}</p>
      )}
    </div>
  );
}