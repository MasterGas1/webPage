import type { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";
import TableHeader from "./TableHeader";
import TableColumn from "./TableColumn";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableColumn>Column 1</TableColumn>
          <TableColumn>Column 2</TableColumn>
          <TableColumn>Column 3</TableColumn>
          <TableColumn>Column 4</TableColumn>
        </TableHeader>
        <TableBody cursorPointer>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

export const Actions: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableColumn>Column 1</TableColumn>
          <TableColumn>Column 2</TableColumn>
          <TableColumn>Column 3</TableColumn>
          <TableColumn>Column 4</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
            <TableCell>
              <button>Actions</button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
            <TableCell>
              <button>Actions</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

export const EmptyList: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableColumn>Column 1</TableColumn>
          <TableColumn>Column 2</TableColumn>
          <TableColumn>Column 3</TableColumn>
          <TableColumn>Column 4</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No hay registros"></TableBody>
      </>
    ),
  },
};
