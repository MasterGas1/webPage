"use client"

import React, { useContext, useEffect } from 'react'
import { Input, Button, Spinner} from '@nextui-org/react';
import {ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { Context as AuthContext } from '@/context/AuthContext';

import Image from 'next/image';
import imageLogo from '../../../../public/LogoMastergas.png';

import { useForm } from '@/hook/useForm';
import { useValidateLoginForm } from '@/hook/useValidateLoginForm';

import Spacer from '@/components/Spacer';



const Page = () => {

  const router = useRouter();

  const {state, signin, getToken} = useContext(AuthContext)

  const {onChange, email, password} = useForm({
    email: '',
    password: '',
  })

  const {isValid,errorEmail,errorPassword,validateInputs} = useValidateLoginForm({email,password})

  const onSubmit = () => {
    validateInputs();
    if (isValid.current) {
      signin({email, password});
    }
  }

  useEffect(() => {
    if (!state.token) {
      getToken()
    } else {
      router.push('/dashboard')
    }
  },[state.token])

  return (
    <div className="flex flex-col min-h-screen sm:flex-row">
      <div className="bg-green-950 flex items-center justify-center flex-1 w-full">
        <div 
          className="flex flex-col w-3/5 items-center flex-wrap "
        >
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            className="max-w-full"
            size='lg'
            errorMessage={errorEmail}
            isInvalid={errorEmail !== ''}
          />
          <Spacer/>
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            size='lg'
            onChange={e => onChange(e)}
            className="mb-4 w-full"
            errorMessage={errorPassword}
            isInvalid={errorPassword !== ''}
          />
          <div
            className=' w-full flex justify-end '
          >
            <Button
              type="button"
              className="bg-neutral-200 text-green-950 font-bold p-2 rounded h-11 w-full sm:w-32"
              onClick={() => onSubmit()}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white flex items-center justify-center flex-1">
        <div className="text-center w-full justify-center flex">
          <Image
            src={imageLogo}
            alt="Logo mastergas"
            className="w-2/5 h-auto"
          />
        </div>
      </div>

      {
        state.loading
        ? <div className="bg-black bg-opacity-50 flex w-full h-full items-center justify-center flex-1 absolute">
            <Spinner color='success'/>
          </div>
        : null
      }
      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default Page;
