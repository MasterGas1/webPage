import React, { FC } from "react";

interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: FC<TableCellProps> = ({ children }) => {
  return <td>{children}</td>;
};

export default TableCell;
