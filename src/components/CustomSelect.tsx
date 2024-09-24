'use client'

import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface CustomSelectProps{
    label: string
    name: string
    value: string
    items: {
      key: string,
      value: any,
      label: string
    }[]
    defaultValue?: string | null
    readonly?: boolean
    onChange: (e : React.ChangeEvent<HTMLSelectElement>) => void
}

const CustomSelect = ({label, items, name, value, defaultValue = null, readonly, onChange}: CustomSelectProps) => {
  return (
    <Select
        label={label}
        isRequired
        defaultSelectedKeys={ defaultValue ? [defaultValue.toString()] : undefined}
        variant='bordered'
        classNames={{
            label: 'text-principal-color dark:text-white/90 text-md',
        }}
        className='bg-white rounded-xl'
        name={name}
        disabled={readonly}
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