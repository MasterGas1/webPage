import React, { useContext } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'

import { Context as ServicesContext } from '@/context/serviceContext'

const TableService = () => {

    const { state, getOneService } = useContext(ServicesContext)

  return (
    <div className='flex w-full justify-center'>
        <Table 
          aria-label="Active table"
          selectionMode="single"  
        >
          <TableHeader className='bg-transparent opacity-0'>
            <TableColumn width={400}>Nombre</TableColumn>
            <TableColumn className='text-center'>Descripción</TableColumn>
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
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size='sm' variant='light'>
                                    <IoEllipsisVerticalOutline size={20} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
    </div>
  )
}

export default TableService