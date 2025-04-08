import React, { FC } from "react";
import styles from "./Spinner.module.css";

import { SpinnerProps } from "./SpinnerProps";

const Spinner: FC<SpinnerProps> = ({ color, size }) => {
  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
      }}
      className={styles.loader}
    />
  );
};

export default Spinner;
