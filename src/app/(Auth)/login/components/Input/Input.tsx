import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({ label, onChange, errorMessage, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>

      <input onChange={onChange} {...props} />

      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
