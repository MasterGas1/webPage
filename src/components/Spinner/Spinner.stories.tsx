import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 30,
  },
};

export const Large: Story = {
  args: {
    size: 50,
  },
};

export const Color: Story = {
  args: {
    color: "var(--error-color)",
  },
};
