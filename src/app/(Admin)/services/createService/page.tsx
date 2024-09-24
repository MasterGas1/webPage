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

import { optionRootService } from '@/data/selectOptionData'

import { Context as ServicesContext } from '@/context/serviceContext';

const page = () => {

  const router = useRouter()

  const [price, setPrice] = useState(0)

  const {createService} = useContext(ServicesContext)

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

      if (type === 'root service price' && isValid.current.price) {
        createService({...form, price}, router)
      } else if (type === 'root service') {
        createService(form, router)
      }

    }
  }

  return (
    <div className='pl-10 pr-10 pt-10 w-full flex flex-col h-3/4'>
        <CustomCreationTitle title='Crear Servicio'/>
        
        <div
          className='grid gap-4 grid-cols-2 w-full mt-20'
        >
          <div>
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

            <br/>

            <div
              className='grid gap-4 grid-cols-2 w-full'
            >
              <CustomSelect
                  label='Tipo de Servicio'
                  name='type'
                  value={type}
                  items={optionRootService}
                  onChange={(e) => {
                    onChange(e)
                    changeState('type', true)
                  }}
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