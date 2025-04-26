import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <ModalContent>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <p>Modal body</p>
        </ModalBody>
        <ModalFooter>
          <button>Save changes</button>
          <button>Cancel</button>
        </ModalFooter>
      </ModalContent>
    ),
    isOpen: false,
    onClose: () => {},
  },
};
