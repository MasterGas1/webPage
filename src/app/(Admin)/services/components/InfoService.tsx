import { ServicesInterface } from '@/interfaces/servicesInterface'
import React, { useContext } from 'react'

import { Context as ServicesContext } from '@/context/serviceContext';
import CustomPill from '@/components/CustomPill';

const InfoService = () => {

    const { state: { service } } = useContext(ServicesContext)

  return (
    <>
        {
            service !== null 
            ?<div
                className='flex flex-col gap-2 border-3 bg-gray-50 border-principal-color p-5 rounded-lg mb-10'
             >
                <div className='flex gap-8'>
                    <span className='text-lg text-principal-color font-semibold'>Nombre: <span className='text-black'>{service.name}</span></span>
                    <span className='text-lg text-principal-color font-semibold'>Dispoinibilidad: <CustomPill label={service.available ? 'Disponible' : 'No disponible'} color={service.available ? 'bg-principal-color' : 'bg-error-color'} /> </span>
                </div>
                <div>
                    <span className='text-lg text-principal-color font-semibold'>Tipo: <span className='text-black'>{
                        service.type === 'root service' 
                            ? 'Servicio principal'
                            : service.type === 'subservice'
                                ? 'Subservicio'
                                : service.type === 'price'
                                    ? 'Precio'
                                    : 'Servicio principal precio'
                        }
                        </span>
                    </span>
                    {
                        service.price !== undefined && <span className='ml-4 text-lg text-principal-color font-semibold'>Precio: <span className='text-black'>{service.price}</span></span>
                    }
                    
                </div>
                <span className='text-lg text-principal-color font-semibold'>Descripción:</span>
                <p className='text-black font-semibold'>{service.description}</p>
            </div>
            : null
        }
    </>
  )
}

export default InfoService