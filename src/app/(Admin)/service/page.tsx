'use client';

import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import Image from 'next/image';
import { IoAdd } from "react-icons/io5";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import productImage from '../../../../public/product.png';

const page = () => {
  return (
    <div className='p-10 w-full flex flex-col justify-center'>
      <div className='flex w-full justify-center mb-2'>
        <h1 className='font-bold text-principal-color'>Servicios</h1>
      </div>
      <div className='flex w-full justify-end mb-2'>
        <Button isIconOnly size="md" radius="md" className='bg-black text-white'>
          <IoAdd size={40} color='white'/>
        </Button>
      </div>
      <div className='flex w-full justify-center'>
        <Table radius='sm' shadow='none' className='bg-transparent'>
          <TableHeader className='bg-transparent opacity-0'>
            <TableColumn width={400}>Nombre</TableColumn>
            <TableColumn className='text-center'>Descripción</TableColumn>
            <TableColumn>Precio</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <div className='flex gap-2 items-center'>
                  <Image alt='product' width={30} height={30} src={productImage}/>
                  <p>Product Name</p>
                </div>
              </TableCell>
              <TableCell className='text-center'>Description Product</TableCell>
              <TableCell>190.99</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button size='lg' radius='full' isIconOnly className='bg-transparent text-black'>
                    <PiDotsThreeOutlineVertical size={40}/>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default page