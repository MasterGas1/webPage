'use-client';
import { ServicesInterface } from '@/interfaces/servicesInterface';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

type Props = {
    openModal: (isOpen: boolean) => void
    isOpen: boolean
    service: ServicesInterface
}

const ServicesDetail = ({ isOpen, openModal, service }: Props) => {

    // Realizar peticion al backend de find one un servicio (solo agregar la funcion al context), hardcodear data faltante

    const formatCurrency = (numberString: string): string => {
        const number = parseFloat(numberString);

        if (isNaN(number)) {
            throw new Error('El valor proporcionado no es un número válido');
        }

        return '$' + number.toFixed(2);
    };

    return (
        <Modal size='3xl' isOpen={isOpen} onOpenChange={() => openModal(false)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            <div className="border-b border-b-gray-300">
                                <p className='mb-3 font-light'>Detalles del Servicio</p>
                            </div>
                        </ModalHeader>
                        <ModalBody className='flex flex-col'>
                            <div className='flex flex-row justify-around w-full'>
                                <div className='flex justify-center items-center w-1/4'>
                                    <Image alt='product' width={30} height={30} src={`${service.image}`} />
                                </div>
                                <div className='flex gap-6 w-3/4'>
                                    <div className='flex flex-col gap-6 w-full'>
                                        <Input className='w-full' variant='flat' label='Nombe' disabled type='text' value={service.name} size='sm' />
                                        <Input variant='flat' label='Descripción' disabled type='text' value={service.description} size='sm' />
                                    </div>
                                    <div className='flex flex-col gap-6 w-full'>
                                        <Input variant='flat' label='Precio' disabled type='text' value={formatCurrency((service.price ?? 0).toString())} size='sm' />
                                        <Input variant='flat' label='Servicio Padre' disabled type='text' value='Servicios generales' size='sm' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full border-2 rounded-lg'>
                                <Table aria-label="Services table" radius='sm' shadow='none' className='bg-transparent'>
                                    <TableHeader className='bg-transparent opacity-0'>
                                        <TableColumn width={300}>Nombre</TableColumn>
                                        <TableColumn>Descripción</TableColumn>
                                        <TableColumn>Precio</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Servicio relacionado con el mantenimiento</TableCell>
                                            <TableCell>Lorem ipsum dolor sit amet, onsectetur</TableCell>
                                            <TableCell>{formatCurrency('200')}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Servicio relacionado</TableCell>
                                            <TableCell>Lorem ipsum dolor</TableCell>
                                            <TableCell>{formatCurrency('200')}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Servicio relacionado con el mantenimiento</TableCell>
                                            <TableCell>Lorem ipsum dolor sit amet, onsectetur</TableCell>
                                            <TableCell>{formatCurrency('200')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ServicesDetail