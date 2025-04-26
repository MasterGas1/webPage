import React, { FC, useEffect } from "react";
import styles from "./Table.module.css";

interface TableBodyProps {
  children?: React.ReactNode[];
  cursorPointer?: boolean;
  emptyContent?: string;
}

const TableBody: FC<TableBodyProps> = ({
  children,
  cursorPointer,
  emptyContent = "No data available",
}) => {
  return (
    <tbody className={`${cursorPointer ? styles.cursorPointer : ""}`}>
      {children && children.length ? (
        children
      ) : (
        <tr className={styles.noHover}>
          <td colSpan={100}>
            <div className={styles.emptyTableWrapper}>{emptyContent}</div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
