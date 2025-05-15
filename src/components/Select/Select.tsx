import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

import styles from "./Select.module.css";

import { SelectItemProps } from "./SelectItem";
import { RadiusFull } from "../Button/Button.stories";

interface SelectProps {
  label?: string;
  children: ReactNode;
  variants?: "flat" | "bordered";
  value: string;
  fullWidth?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
}
const Select: FC<SelectProps> = ({
  label,
  children,
  variants = "flat",
  value,
  fullWidth = true,
  errorMessage,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div>
      <div
        className={`${styles.selectContainer} ${
          variants === "bordered" && styles.selectContainerBordered
        }
        ${fullWidth && styles.fullWidth}  
      `}
        onClick={() => {
          setOpen(!open);
          setFocused(!focused);
        }}
        onBlur={() => {
          setFocused(false);
          setOpen(false);
        }}
        tabIndex={0}
      >
        <div className={`${styles.selectWrapper} ${open ? styles.open : ""}`}>
          {label && (
            <label
              className={`${styles.floatingLabel} ${
                focused || value ? styles.floating : ""
              }`}
            >
              {label}
            </label>
          )}

          <div className={styles.selectedValue}>
            {value || (!label && "Select an option")}
          </div>
        </div>

        <IoChevronDownOutline
          className={`${styles.icon} ${focused ? styles.rotate : ""}`}
        />

        {focused && (
          <ul className={styles.selectDropdown}>
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child as ReactElement<SelectItemProps>, {
                  onSelect: handleSelect,
                  selectedValue: value,
                });
              }
              return null;
            })}
          </ul>
        )}
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Select;
