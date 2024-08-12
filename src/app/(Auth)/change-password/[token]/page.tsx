'use client'

import React, { useRef } from 'react'
import Image from 'next/image'

import imageLogo from '../../../../../public/LogoMastergas.png'

import CustomInput from '@/components/CustomInput'
import Spacer from '@/components/Spacer'
import { useForm } from '@/hook/useForm'
import CustomButton from '@/components/CustomButton'

const page = () => {

    const {password, confirmPassword, onChange} = useForm({
        password: '',
        confirmPassword: ''
    })

    const isValid = useRef({
        password: false,
        confirmPassword: false
    })

    const changeState = (name: string, value: boolean) => {
        isValid.current = ({
            ...isValid.current,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(isValid.current).every((value) => value === true) && password === confirmPassword) {
            console.log('Form enviado')
        }
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen min-w-full h-screen bg-principal-color">
            <div className='w-1/3 h-4/5 bg-white rounded-lg flex flex-col justify-center p-8 items-center'>
                <Image
                    src={imageLogo}
                    alt="Logo mastergas"
                    className="w-2/5 h-auto" 
                />

                <h1 className='text-4xl text-principal-color font-bold'>Nueva contraseña</h1>

                <Spacer/>

                <form
                    className='flex flex-col gap-4 w-full'
                    onSubmit={handleSubmit}

                >
                    <CustomInput
                        label='Nueva contraseña'
                        type='password'
                        name='password'
                        patternMatch={/.{8,}/}
                        value={password}
                        errorMessage='La contraseña debe tener al menos 8 caracteres'
                        setIsValid={changeState}
                        onChange={onChange}
                    />

                    <CustomInput
                        label='Confirmar nueva contraseña'
                        type='password'
                        name='confirmPassword'
                        patternMatch={/.{8,}/}
                        value={confirmPassword}
                        errorMessage='La contraseña debe tener al menos 8 caracteres'
                        setIsValid={changeState}
                        onChange={onChange}
                    />

                    <CustomButton
                        label='Confirmar'
                        type='submit'
                    />
                </form>
            </div>
        </div>
    )
}

export default page;