import React from "react";

import styles from "./Loading.module.css";
import Spinner from "../Spinner/Spinner";
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spinner color="white" />
    </div>
  );
};

export default Loading;
