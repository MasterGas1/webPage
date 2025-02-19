export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  variants: "flat" | "bordered" | "underlined";
  required?: boolean;
  isClearable?: boolean;
  isError?: boolean;
  errorMessage?: string;
  radius?: "none" | "sm" | "md" | "lg";
  onClear?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
