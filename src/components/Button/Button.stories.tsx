import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import { FaCheck } from 'react-icons/fa';

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select"
    },
    type: {
      control: "select"
    },
    backgroundColor: {
      control: 'select'
    },
    textColor: {
      control: 'select'
    },
    disabled: {
      type: 'boolean'
    },
    fullWidth: {
      type: 'boolean'
    },
    size: {
      control: 'select'
    },
    radius: {
      control: 'select'
    },
    iconPosition: {
      control: 'select'
    },
    icon: {
      type: 'string'
    },
    isLoading: {
      type: 'boolean'
    }
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Flat: Story = {
  args: {
    label: 'Flat button',
    variant: 'flat',
  }
};

export const Bordered: Story = {
  args: {
    label: 'Bordered button',
    variant: 'bordered',
  }
}

export const NoneRadius = {
  args: {
    label: "None Radius",
    radius: 'none'
  }
}
export const SmallRadius = {
  args: {
    label: "Small Radius",
    radius: 'small'
  }
}
export const MediumRadius = {
  args: {
    label: "Medium Radius",
    radius: 'medium'
  }
}
export const LargeRadius = {
  args: {
    label: "Large Radius",
    radius: 'large'
  }
}
export const FullRadius = {
  args: {
    label: "Full Radius",
    radius: 'full'
  }
}

export const Icon: Story = {
  args: {
    icon: FaCheck,
    variant: 'flat',
  }
}

export const IsLoading: Story = {
  args: {
    variant: 'flat',
    isLoading: true
  }
}