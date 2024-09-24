'use client';

import React, { useContext, useEffect, useState } from 'react'
import { Context as ServicesContext } from '@/context/serviceContext';
import Link from 'next/link';
import { IoAdd } from "react-icons/io5";

import { ServicesInterface } from '@/interfaces/servicesInterface';

import TableService from './components/TableService';
import InfoService from './components/InfoService';
import LinkList from './components/LinkList';


const page = () => {


  const {state: { service, reload }, getServices } = useContext(ServicesContext);
 

  useEffect(() => {
    if (service === null || reload) {
      getServices()
    }
  }, [])

  return (
    <div className='p-10 w-full flex flex-col justify-center'>
      <div className='flex w-full justify-center mb-2'>
        <h1 className='font-bold text-principal-color text-3xl'>Servicios</h1>
      </div>

      <LinkList/>

      {
        service === null || service.type === 'root service' || service.type === 'subservice' 
        ? <div className='flex w-full justify-end mb-2'>
            <Link href={service === null ? '/services/createService' : `/services/createService/${service?._id}`} className='bg-principal-color text-white p-1 rounded-large'>
              <IoAdd size={40} color='white' />
            </Link>
          </div>
        : null
      }


      <InfoService/>

      {
        service === null || service.type === 'root service' || service.type === 'subservice'
        ? <TableService/>
        : null
      }
    </div>
  )
}

export default page