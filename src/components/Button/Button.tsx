import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { ButtonProps } from "./ButtonProps";
import styles from "./Button.module.css";
import { FaSpinner } from 'react-icons/fa'

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const Button: FC<ButtonProps> = ({
  disabled,
  style,
  hover,
  label,
  fullWidth = false,
  size = "medium",
  icon: Icon,
  iconPosition = "left",
  isLoading = false,
  type = "button",
  variant = "flat",
  radius = "small",
  backgroundColor = "bgPrimary",
  textColor = 'textLight',
  onClick,
  ...props
}) => {
  const variantClasses = {
    flat: styles.flatButton,
    bordered: styles.borderedButton
  }

  const sizesClasses = {
    small: styles.btnSmall,
    medium: styles.btnMedium,
    large: styles.btnLarge
  }

  const radiusClasses = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
    full: styles.radiusFull
  }

  return (
    <button
      className={`
        ${styles.defaultButton} 
        ${styles[backgroundColor]} 
        ${styles[textColor]}
        ${variantClasses[variant]}
        ${radiusClasses[radius]}
        ${sizesClasses[size]}
        ${fullWidth && styles.fullWidth}
        ${hover}
        `
      }
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={style}
    >
      <span className={styles.buttonContent}>
        {isLoading ? (
          <>
            <FaSpinner className={styles.spinner} />
            <span>Cargando</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon className={styles.icon} />}
            {label && <span className={styles.text}>{label}</span>}
            {Icon && iconPosition === "right" && <Icon className={styles.icon} />}
          </>
        )}
      </span>
    </button>
  )
}

export default Button