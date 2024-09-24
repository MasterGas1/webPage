import React from 'react'

interface CreationTitleProps {
    title: string
}


const CustomCreationTitle = ({title}: CreationTitleProps) => {

  return (
    <div
        className='flex w-full justify-center mb-2 border-b-1 border-gray-500'
    >
        <h2 className='font-bold text-principal-color text-3xl'>{title}</h2>
    </div>
  )
}

export default CustomCreationTitle