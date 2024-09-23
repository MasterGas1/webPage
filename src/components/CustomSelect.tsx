'use client'

import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface CustomSelectProps{
    label: string
    name: string
    value: string
    items: {
      key: string,
      value: string,
      label: string
    }[]
    onChange: (e : React.ChangeEvent<HTMLSelectElement>) => void
}

const CustomSelect = ({label, items, name, value, onChange}: CustomSelectProps) => {
  return (
    <Select
        label={label}
        isRequired
        variant='bordered'
        classNames={{
            label: 'text-principal-color dark:text-white/90 text-md',
        }}
        className='bg-transparent border-3'
        name={name}
        value={value}
        onChange={onChange}
    >
        {
          items.map(({value, label}) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))
        }
    </Select>

  )
}

export default CustomSelect