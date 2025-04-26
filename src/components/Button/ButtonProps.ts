import { ButtonHTMLAttributes, ReactNode, MouseEvent } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variants?: "flat" | "bordered";
  backgroundColor?: "principal" | "secondary" | "error";
  radius?: "none" | "full" | "medium";
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
