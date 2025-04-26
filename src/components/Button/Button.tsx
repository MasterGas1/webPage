import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { ButtonProps } from "./ButtonProps";
import styles from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const Button: FC<ButtonProps> = ({
  label,
  variants = "flat",
  backgroundColor = "principal",
  className,
  isLoading,
  disabled,
  radius = "medium",
  leftIcon,
  rightIcon,
  icon,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const [color, setColor] = useState("");
  const [height, setHeight] = useState(0);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(event);
  };

  const variantsClasses = {
    flat: {
      principal: styles.buttonContainerFlatPrincipal,
      secondary: styles.buttonContainerFlatSecondary,
      error: styles.buttonContainerFlatError,
    },
    bordered: {
      principal: styles.buttonContainerBorderedPrincipal,
      secondary: styles.buttonContainerBorderedSecondary,
      error: styles.buttonContainerBorderedError,
    },
  };

  const radiusClasses = {
    none: null,
    full: styles.buttonRadiusFull,
    medium: styles.buttonRadiusMedium,
  };

  useEffect(() => {
    if (ref.current) {
      const styles = window.getComputedStyle(ref.current);
      setColor(styles.color);
      setHeight(ref.current.getBoundingClientRect().height / 2);
    }
  }, []);

  return (
    <button
      className={`${styles.buttonContainer} ${
        !className || backgroundColor
          ? variantsClasses[variants][backgroundColor]
          : className
      } ${(disabled || isLoading) && styles.buttonDisabled}
      ${radiusClasses[radius]} ${icon && !label && styles.buttonIconContainer}
      ${className}
      `}
      onClick={handleClick}
      ref={ref}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner color={color} size={height} />}
      {leftIcon}
      {label && (
        <label className={`${isLoading && styles.buttonLabel}`}>{label}</label>
      )}
      {icon && !label && icon}
      {rightIcon}
      <span className={styles.rippleContainer}>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </span>
    </button>
  );
};

export default Button;
