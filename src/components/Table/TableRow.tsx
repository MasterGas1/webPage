import React, { FC } from "react";

interface TableRowProps {
  children: React.ReactNode;
  doubleClick?: () => void;
}

const TableRow: FC<TableRowProps> = ({ children, doubleClick }) => {
  return <tr onClick={doubleClick}>{children}</tr>;
};

export default TableRow;
