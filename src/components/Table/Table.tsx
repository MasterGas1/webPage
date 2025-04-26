import React, { FC } from "react";

import styles from "./Table.module.css";

interface TableProps {
  children: React.ReactNode;
}

const Table: FC<TableProps> = ({ children }) => {
  return <table className={styles.tableContainer}>{children}</table>;
};

export default Table;
