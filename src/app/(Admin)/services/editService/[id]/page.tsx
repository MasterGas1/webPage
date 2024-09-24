'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Spinner } from '@nextui-org/react';
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'

import {ToastContainer } from 'react-toastify';

import CustomCreationTitle from '@/components/CustomCreationTitle'
import CustomInput from '@/components/CustomInput'
import CustomSelect from '@/components/CustomSelect'
import CustomTextArea from '@/components/CustomTextArea'
import CustomButton from '@/components/CustomButton'

import { serviceAvailableOptions, serviceOptions } from '@/data/selectOptionData'

import { Context as ServicesContext } from '@/context/serviceContext';

const page = () => {

  const {state: {service} , updateService, getInfoService} = useContext(ServicesContext)
  
  const router = useRouter()
  const { id } = useParams()


  const [price, setPrice] = useState(0)
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    available: ''
  })

  const {name, description, type, available } = form



  const isValid = useRef({
    name: true,
    description: true,
    price: true,
    available: false
  });



  const changeState = (name: string, value: boolean) => {
    isValid.current = ({
      ...isValid.current,
      [name]: value
    })
  }

  useEffect(() => {
    getInfoService(id.toString());
  },[])


  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        description: service.description,
        type: service.type,
        available: service.available
      })

      if (service.type === 'root service price' || service.type === 'price') {
        setPrice(service.price || 0)
      }
    }
  },[service])

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const onClick = () => {
    if (isValid.current.name && isValid.current.description) {

      if ((type === 'root service price' || type === 'price') && isValid.current.price) {
        updateService(id.toString(), {...form, price}, router)
      } else if (type === 'root service' || type === 'subservice') {
        updateService(id.toString(), form, router)
      } 

    }
  }

  return (
    <div className='pl-10 pr-10 pt-10 w-full flex flex-col h-3/4'>
        <CustomCreationTitle title='Editar Servicio'/>
        {
            service !== null  
            ?<>
                <div
                className='grid gap-4 grid-cols-2 w-full mt-20'
                >
                    <div>
                        <div
                        className='grid gap-4 grid-cols-2 w-full'
                        >
                            <CustomInput
                                label='Nombre del Servicio'
                                name='name'
                                type='text'
                                value={name}
                                patternMatch={/^[A-Za-z0-9 /]{2,}$$/}
                                errorMessage='Solo se aceptan letras y numeros'
                                setIsValid={changeState}
                                onChange={(e) => onChange(e)}
                            />

                            {
                                service.fatherServiceId !== undefined
                                && <CustomInput
                                    label='Servicio Padre'
                                    name='fatherServiceId'
                                    type='text'
                                    value={service.fatherServiceId.name}
                                    patternMatch={/^/}
                                    errorMessage=''
                                    setIsValid={changeState}
                                    readonly
                                    onChange={(e) => onChange(e)}
                                />
                            }
                        </div>

                        <br/>

                        <div
                        className='grid gap-4 grid-cols-2 w-full'
                        >
                        <CustomInput
                            label='Tipo de Servicio'
                            name='type'
                            value={type === 'root service' ? 'Servicio principal'
                              : type === 'subservice' ? 'Subservicio'
                              : type === 'price' ? 'Precio'
                              : 'Servicio principal precio'
                            }
                            readonly={true}
                            onChange={(e) => {}}
                            setIsValid={() => {}}
                            errorMessage=''
                            patternMatch={/^/}
                            type='text'
                        />

                        {
                            type === 'root service price' 
                            && <CustomInput
                                label='Precio'
                                name='price'
                                type='number'
                                value={price.toString()}
                                patternMatch={/^[1-9][0-9]*$/}
                                errorMessage='Solo se aceptan numeros'
                                setIsValid={changeState}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        }
                        </div>

                        <br/>

                        <CustomSelect
                            label='Disponible'
                            name='available'
                            value={available}
                            items={serviceAvailableOptions}
                            defaultValue={service?.available}
                            onChange={(e) => onChange(e)}
                        />

                        <br/>

                        <br/>

                        <CustomTextArea
                            label='Descripción'
                            name='description'
                            value={description}
                            errorMessage='Solo se aceptan letras y numeros'
                            patternMatch={/^[A-Za-z0-9 ]{2,}$/}
                            setIsValid={changeState}
                            onChange={(e) => onChange(e)}
                        />
                </div>

                <div className='flex justify-center'>
                    <Image
                        src={'https://res.cloudinary.com/dnesdnfxy/image/upload/v1726873252/mastergas23/services/vczvh2friktamywhum3c.webp'}
                        width={400}
                        height={400}
                        alt="image"
                        className="w-2/5"
                    />
                </div>
            
                </div>

                <div
                className='flex justify-end mt-10 items-end h-full'
                >
                <CustomButton
                    label='Guardar'
                    type='button'
                    onClick={onClick}
                />
                </div>

                <ToastContainer autoClose={2000}/>
            </>
        :   <div className="flex w-full h-full items-center justify-center flex-1 absolute">
                <Spinner color='success'/>
            </div>
        }
       
    </div>
  )
}

export default page