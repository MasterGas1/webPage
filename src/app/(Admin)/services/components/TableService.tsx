import React, { useContext, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import CustomConfirmationModal from '@/components/CustomConfirmationModal'

import { Context as ServicesContext } from '@/context/serviceContext'
import CustomPill from '@/components/CustomPill'

const TableService = () => {

    const { state, getOneService, deleteService } = useContext(ServicesContext)

    const [idService, setIdService] = useState('')

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const router = useRouter();

  return (
    <div className='flex w-full justify-center'>
        <Table 
          aria-label="Active table"
          selectionMode="single"  
        >
          <TableHeader className='bg-transparent opacity-0'>
            <TableColumn width={400}>Nombre</TableColumn>
            <TableColumn className='text-center'>Descripción</TableColumn>
            <TableColumn>Disponibilidad</TableColumn>
            <TableColumn>Precio</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent="No hay servicios registrados"
          >
            {
              state.services.map((service) => (
                <TableRow key={service._id} onDoubleClick={() => {getOneService(service._id)}} className='cursor-pointer'>
                    <TableCell>{service.name}</TableCell>
                    <TableCell className='text-center'>{service.description}</TableCell>
                    <TableCell>
                      <CustomPill label={service.available ? 'Disponible' : 'No disponible'} color={service.available ? 'bg-principal-color' : 'bg-error-color'} />
                    </TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size='sm' variant='light'>
                                    <IoEllipsisVerticalOutline size={20} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Options">
                                <DropdownItem onClick={() => router.push(`/services/editService/${service._id}`)}>Edit</DropdownItem>
                                <DropdownItem onClick={() => {
                                  onOpen(); 
                                  setIdService(service._id)
                                  }
                                }>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <CustomConfirmationModal
          isOpen={isOpen}
          headerTitle="Eliminar servicio"
          content="¿Estás seguro de eliminar este servicio?"
          onOpenChange={onOpenChange}
          onClickConfirmation={() => deleteService(idService, router)} 
        />
    </div>
  )
}

export default TableService