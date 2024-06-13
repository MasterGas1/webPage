'use client';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Input,
    Textarea
} from '@nextui-org/react';

import React, { useContext, useEffect } from 'react'

import { Context as ServicesContext } from '@/context/serviceContext';

import { useForm } from '@/hook/useForm';
import { ServicesInterface } from '@/interfaces/servicesInterface';

type Props = {
    openModal: (isOpen: boolean) => void
    isOpen: boolean
}

const CreateService = ({ isOpen, openModal }: Props) => {

    const { state, createService } = useContext(ServicesContext);

    console.log('State====>', state)

    const { onChange, name, price, description } = useForm({
        name: '',
        price: '',
        description: '',
    })

    const onSubmit = () => {
        const body: ServicesInterface = {
            name,
            price: parseInt(price),
            description,
            type: "root service",
        }
        console.log('Values====>', body)
        createService(body)
    }

    return (
        <Modal size='3xl' isOpen={isOpen} onOpenChange={() => openModal(false)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <form onSubmit={onSubmit}>
                            <ModalHeader className="flex flex-col gap-1">
                                <div className='border-b border-b-gray-'>
                                    <p className='mb-3 font-light'>Creación del Servicio</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex justify-between w-full gap-5'>
                                    <Input
                                        variant='flat'
                                        placeholder='Nombre del Servicio'
                                        isRequired
                                        className='w-1/2 rounded-2xl'
                                        label='Nombre del Servicio'
                                        name='name'
                                        size='sm'
                                        min={12}
                                        value={name}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <Input
                                        type='number'
                                        name='price'
                                        min={0}
                                        variant='flat'
                                        placeholder='Precio'
                                        isRequired
                                        className='w-1/2'
                                        label='Precio'
                                        size='sm'
                                        value={price}
                                        required={true}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className='flex justify-between w-full gap-5'>
                                    <Textarea
                                        name='description'
                                        variant='flat'
                                        placeholder='Descripcion'
                                        isRequired
                                        className='w-full'
                                        label='Descripción'
                                        size='sm'
                                        required={true}
                                        value={description}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                {/* <div className='flex justify-between w-full gap-5'>
                                <Input type='file' />
                            </div> */}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button type='submit' className='bg-principal-color text-white'>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default CreateService