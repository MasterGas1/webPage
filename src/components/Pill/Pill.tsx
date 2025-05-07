import React, { FC } from "react";
import styles from "./Pill.module.css";

interface PillProps {
  text: string;
  color?: "principal" | "secondary" | "error";
}

const Pill: FC<PillProps> = ({ text, color }) => {
  const stylesColor = {
    principal: styles.principalPill,
    secondary: styles.secondaryPill,
    error: styles.errorPill,
  };

  return (
    <div className={`${styles.pillContainer} ${color && stylesColor[color]}`}>
      <span>{text}</span>
    </div>
  );
};

export default Pill;
