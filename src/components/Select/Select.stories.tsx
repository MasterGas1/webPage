import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Select from "./Select";
import SelectItem from "./SelectItem";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Selected option",
    children: [
      <SelectItem value="Option 1">Option 1</SelectItem>,
      <SelectItem value="Option 2">Option 2</SelectItem>,
      <SelectItem value="Option 3">Option 3</SelectItem>,
    ],
  },
};

export const Bordered: Story = {
  args: {
    label: "Selected option",
    children: [
      <SelectItem value="Option 1">Option 1</SelectItem>,
      <SelectItem value="Option 2">Option 2</SelectItem>,
      <SelectItem value="Option 3">Option 3</SelectItem>,
    ],
    variants: "bordered",
  },
};
