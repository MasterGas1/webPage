import React from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface CustomConfirmationModalProps {
    isOpen: boolean,
    headerTitle: string,
    content: string, 
    onOpenChange: () => void
    onClickConfirmation: Function
}

const CustomConfirmationModal = ({isOpen, headerTitle, content, onOpenChange, onClickConfirmation}: CustomConfirmationModalProps) => {
  return (
    <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
    >
        <ModalContent>
            {
              (onClose) => (
                <>
                    <ModalHeader className="text-principal-color text-center text-2xl font-bold"> 
                        {headerTitle}
                    </ModalHeader>
                    
                    <ModalBody>
                        {content}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='flat' color="danger" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button color="success" onClick={() => {
                            onClickConfirmation()
                            onClose()
                        }}>
                            Aceptar
                        </Button>

                    </ModalFooter>
                </>
              )}
        </ModalContent>

    </Modal>
  )
}

export default CustomConfirmationModal