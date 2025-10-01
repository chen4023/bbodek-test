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

// Select 컴포넌트용 타입
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}
