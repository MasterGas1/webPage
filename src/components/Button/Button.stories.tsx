import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const FlatPrincipal: Story = {
  args: {
    label: "Flat button",
  },
};

export const FlatSecondary: Story = {
  args: {
    label: "Flat button secondary",
    backgroundColor: "secondary",
  },
};

export const FlatError: Story = {
  args: {
    label: "Flat button error",
    backgroundColor: "error",
  },
};

export const BorderedPrincipal: Story = {
  args: {
    label: "Bordered button",
    variants: "bordered",
  },
};

export const BorderedSecondary: Story = {
  args: {
    label: "Bordered button secondary",
    variants: "bordered",
    backgroundColor: "secondary",
  },
};

export const BorderedError: Story = {
  args: {
    label: "Bordered button error",
    variants: "bordered",
    backgroundColor: "error",
  },
};

export const RadiusFull: Story = {
  args: {
    label: "Full radius button",
    radius: "full",
  },
};

export const RadiusMedium: Story = {
  args: {
    label: "Medium radius button",
    radius: "medium",
  },
};

export const RadiusNone: Story = {
  args: {
    label: "None radius button",
    radius: "none",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading button",
    isLoading: true,
  },
};

export const LoadingSecondary: Story = {
  args: {
    label: "Loading button secondary",
    isLoading: true,
    backgroundColor: "secondary",
  },
};

export const LoadingError: Story = {
  args: {
    label: "Loading button error",
    isLoading: true,
    backgroundColor: "error",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled button",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    label: "Disabled button secondary",
    backgroundColor: "secondary",
    disabled: true,
  },
};

export const DisabledError: Story = {
  args: {
    label: "Disabled button error",
    backgroundColor: "error",
    disabled: true,
  },
};
