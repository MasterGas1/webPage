'use client'

import { Textarea } from '@nextui-org/react'
import React, { useMemo } from 'react'

interface CustomTextAreaProps {
    label: string
    name: string
    value: string
    errorMessage: string
    patternMatch: RegExp
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setIsValid: (name: string, value: boolean) => void
}

const CustomTextArea = ({label, name, value, errorMessage, patternMatch, onChange, setIsValid}: CustomTextAreaProps) => {

    const isInvalid = useMemo(() => {
        if (value === undefined) {
          setIsValid(name, false)
          return false
        };
        if (value === '') {
          setIsValid(name, false)
          return false;
        }
        if (typeof value === 'string' && !value.match(patternMatch)) {
          setIsValid(name, false)
          return true;
        } else {
          setIsValid(name, true)
        }
    }, [value]);

  return (
    <Textarea
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      fullWidth
      size='lg'
      isRequired
      classNames={{
        input: ['bg-transparent', 'placeholder-principal-color', 'dark:placeholder-white/90'],
      }}
      className='bg-white rounded-xl'
      variant='bordered'
      errorMessage={isInvalid && errorMessage}
      isInvalid={isInvalid}
    />
  )
}

export default CustomTextArea