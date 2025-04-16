import { ButtonHTMLAttributes, ReactNode, MouseEvent } from "react";
import { CSSProperties } from 'react'
import { IconType } from 'react-icons'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  type?: "button" | "submit"
  variant?: "bordered" | "flat"
  backgroundColor?: "bgPrimary" | "bgSecondary" | "bgError"
  //Enum
  textColor?: "textLight" | "textDark" | "textPrimary" | "textSecondary"
  style?: CSSProperties
  hover?: CSSProperties
  icon?: IconType
  iconPosition?: "left" | "right"
  disabled?: boolean
  size?: "small" | "medium" | "large"
  fullWidth?: boolean
  isLoading?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  radius?: "full" | "large" | "medium" | "small" | "none"
}
