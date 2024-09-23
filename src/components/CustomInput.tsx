import { Input } from '@nextui-org/react'
import React, { useMemo } from 'react'

interface CustomInputProps {
    label: string
    type: string
    name: string
    value: string
    errorMessage: string;
    patternMatch: RegExp
    setIsValid: (name: string, value: boolean) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    readonly?: boolean
}

const CustomInput = ({ label, type, name, value, patternMatch, errorMessage, readonly, setIsValid, onChange }: CustomInputProps) => {

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
    <Input
        label={label}
        type={type}
        name={name}
        value={value}
        variant='bordered'
        classNames={{
            label: 'text-principal-color dark:text-white/90 text-md',
            input: ['bg-transparent'],
            inputWrapper: [
              'border-3',
              'group-data-[focus=true]:border-principal-color',
            ],
            innerWrapper: ['bg-transparent'],
        }}
        errorMessage={isInvalid && errorMessage}
        isRequired
        isInvalid={isInvalid}
        onChange={onChange}
        readOnly={readonly}
    />
  )
}

export default CustomInput