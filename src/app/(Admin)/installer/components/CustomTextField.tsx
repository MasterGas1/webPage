import React from 'react'

interface CustomTextFieldProps {
    label: string
    data?: string
}

const CustomTextField = ({label, data}: CustomTextFieldProps) => {
  return (
    <div>
        <h2 className='text-principal-color text-2xl font-bold'>{label}</h2>
        <p className='text-2xl font-bold'>{data}</p>
    </div>
  )
}

export default CustomTextField