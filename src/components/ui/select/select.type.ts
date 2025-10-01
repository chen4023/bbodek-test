// select-box.types.ts
export interface SelectBoxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectBoxProps {
  options: SelectBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  showAsButtons?: boolean;
}
