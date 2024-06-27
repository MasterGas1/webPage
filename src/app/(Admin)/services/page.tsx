'use client';

import React, { useContext, useEffect, useState } from 'react'
import { Context as ServicesContext } from '@/context/serviceContext';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import Image from 'next/image';
import { IoAdd } from "react-icons/io5";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import CreateService from './CreateService';
import { ServicesInterface } from '@/interfaces/servicesInterface';
import ServicesDetail from './ServiceDetail';

const page = () => {

  const [openModal, setOpenModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState({} as ServicesInterface);
  const { state, getServices } = useContext(ServicesContext);
  const { services } = state

  useEffect(() => {
    getServices()
  }, [])

  return (
    <div className='p-10 w-full flex flex-col justify-center'>
      <div className='flex w-full justify-center mb-2'>
        <h1 className='font-bold text-principal-color'>Servicios</h1>
      </div>
      <div className='flex w-full justify-end mb-2'>
        <Button isIconOnly onClick={() => setOpenModal(true)} size="md" radius="md" className='bg-black text-white'>
          <IoAdd size={40} color='white' />
        </Button>
      </div>
      <div className='flex w-full justify-center'>
        <Table aria-label="Services table" radius='sm' shadow='none' className='bg-transparent'>
          <TableHeader className='bg-transparent opacity-0'>
            <TableColumn width={400}>Nombre</TableColumn>
            <TableColumn className='text-center'>Descripción</TableColumn>
            <TableColumn>Precio</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {state.loading ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  <Spinner color='success' />
                </TableCell>
                <TableCell colSpan={4} className='text-center'>
                  <Spinner color='success' />
                </TableCell>
                <TableCell colSpan={4} className='text-center'>
                  <Spinner color='success' />
                </TableCell>
                <TableCell colSpan={4} className='text-center'>
                  <Spinner color='success' />
                </TableCell>
              </TableRow>
            ) :
              services && services.map((service) => (
                <TableRow key={service.name}>
                  <TableCell>
                    <div className='flex gap-2 items-center'>
                      <Image alt='product' width={30} height={30} src={`${service.image}`} />
                      <p>{service.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>{service.description}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>

                      <Dropdown>
                        <DropdownTrigger>
                          <Button size='lg' radius='full' isIconOnly className='bg-transparent text-black'>
                            <PiDotsThreeOutlineVertical size={40} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem onClick={e => {
                            setServiceSelected(service)
                            setOpenDetailModal(true)
                          }} key="new">Mostrar Servicio</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
      <CreateService isOpen={openModal} openModal={setOpenModal} />
      <ServicesDetail isOpen={openDetailModal} openModal={setOpenDetailModal} service={serviceSelected} />
    </div>
  )
}

export default page