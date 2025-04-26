import React, { FC } from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHeader;
