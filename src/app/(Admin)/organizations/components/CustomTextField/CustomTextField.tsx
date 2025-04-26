import React from "react";

import styles from "./CustomTextField.module.css";

interface CustomTextFieldProps {
  label: string;
  data?: string | number;
}

const CustomTextField = ({ label, data }: CustomTextFieldProps) => {
  return (
    <div>
      <h2 className={styles.label}>{label}</h2>
      <p className={styles.data}>{data}</p>
    </div>
  );
};

export default CustomTextField;
