'use client';

import React, { useContext, useEffect, useState } from 'react'
import { Context as ServicesContext } from '@/context/serviceContext';
import { Button} from '@nextui-org/react';
import Image from 'next/image';
import { IoAdd } from "react-icons/io5";

import CreateService from './CreateService';
import { ServicesInterface } from '@/interfaces/servicesInterface';
import ServicesDetail from './ServiceDetail';
import TableService from './components/TableService';

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
        <h1 className='font-bold text-principal-color text-3xl'>Servicios</h1>
      </div>
      <div className='flex w-full justify-end mb-2'>
        <Button isIconOnly onClick={() => setOpenModal(true)} size="md" radius="md" className='bg-principal-color text-white'>
          <IoAdd size={40} color='white' />
        </Button>
      </div>
      <TableService/>
    </div>
  )
}

export default page