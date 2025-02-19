import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Input from "./Input";
import { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Contained: Story = {
  args: {
    label: "Contained input",
    variants: "bordered",
  },
};

export const ErrorContained: Story = {
  args: {
    label: "Error",
    type: "text",
    value: "error",
    isError: true,
  },
};

export const Underlined: Story = {
  args: {
    label: "Underlined input",
    variants: "underlined",
  },
};

export const ErrorUnderlined: Story = {
  args: {
    label: "Error",
    type: "text",
    value: "error",
    isError: true,
    variants: "underlined",
  },
};

export const Flat: Story = {
  args: {
    label: "Flat input",
    variants: "flat",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    value: "",
  },
};

export const Clearable: StoryFn<typeof Input> = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};

Clearable.args = {
  label: "Clearable",
  isClearable: true,
  type: "text",
  value: "  Clearable input",
};

export const Radius: Story = {
  args: {
    label: "Rounded input",
    radius: "lg",
    type: "text",
    value: "",
  },
};
