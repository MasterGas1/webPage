'use client'

import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {ToastContainer } from 'react-toastify';

import CustomCreationTitle from '@/components/CustomCreationTitle'
import CustomInput from '@/components/CustomInput'
import CustomSelect from '@/components/CustomSelect'
import CustomTextArea from '@/components/CustomTextArea'
import CustomButton from '@/components/CustomButton'

import { useForm } from '@/hook/useForm'

import { optionSubService } from '@/data/selectOptionData'

import { Context as ServicesContext } from '@/context/serviceContext';

const page = () => {

  const router = useRouter()

  const [price, setPrice] = useState(0)

  const {state: { service } ,createService} = useContext(ServicesContext)

  const isValid = useRef({
    name: false,
    description: false,
    type: false,
    price: false
  });

  const {name, description,type, form, onChange} = useForm({
    name: '',
    description: '',
    type: ''
  })

  const changeState = (name: string, value: boolean) => {
    isValid.current = ({
      ...isValid.current,
      [name]: value
    })
  }

  const onClick = () => {
    if (isValid.current.name && isValid.current.description && isValid.current.type) {

      if (type === 'price' && isValid.current.price) {
        createService({...form, price, fatherServiceId: service?._id}, router)
      } else if (type === 'subservice') {
        createService({...form, fatherServiceId: service?._id}, router,)
      }

    }
  }

  return (
    <div className='pl-10 pr-10 pt-10 w-full flex flex-col h-3/4'>
        <CustomCreationTitle title='Crear Subservicio'/>
        
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
                    patternMatch={/^[A-Za-z0-9 ]{2,}$$/}
                    errorMessage='Solo se aceptan letras y numeros'
                    setIsValid={changeState}
                    onChange={(e) => onChange(e)}
                />

                <CustomInput
                    label='Nombre del padre'
                    name='parent'
                    type='text'
                    value={service?.name || ''}
                    patternMatch={/^/}
                    errorMessage=''
                    setIsValid={changeState}
                    onChange={() => {}}
                    readonly
                />
            </div>

            <br/>

            <div
              className='grid gap-4 grid-cols-2 w-full'
            >
              <CustomSelect
                  label='Tipo de Servicio'
                  name='type'
                  value={type}
                  items={optionSubService}
                  onChange={(e) => {
                    onChange(e)
                    changeState('type', true)
                  }}
              />

              {
                type === 'price' 
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
            label='Crear'
            type='button'
            onClick={onClick}
          />
        </div>

        <ToastContainer autoClose={2000}/>
    </div>
  )
}

export default page