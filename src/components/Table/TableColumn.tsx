import React, { FC } from "react";

interface TableColumnProps {
  children: string;
}

const TableColumn: FC<TableColumnProps> = ({ children }) => {
  return <th>{children}</th>;
};

export default TableColumn;
