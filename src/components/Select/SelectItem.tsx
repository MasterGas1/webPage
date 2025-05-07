import React, { FC } from "react";

import styles from "./Select.module.css";

export interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

const SelectItem: FC<SelectItemProps> = ({
  value,
  selectedValue,
  children,
  onSelect,
}) => {
  const isActive = value === selectedValue;

  return (
    <li
      className={`${styles.selectItem} ${isActive && styles.selectItemActive}`}
      onClick={() => onSelect && onSelect(value)}
    >
      {children}
    </li>
  );
};

export default SelectItem;
