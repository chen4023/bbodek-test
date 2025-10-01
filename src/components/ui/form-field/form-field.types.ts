import { ReactNode } from "react";

export interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  htmlFor?: string;
  helperText?: string;
  isRequired?: boolean;
  children: ReactNode;
}
