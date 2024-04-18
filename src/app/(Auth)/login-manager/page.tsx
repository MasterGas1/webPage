import React from 'react'
import { Input, Button } from '@nextui-org/react';
import Image from 'next/image';
import imageLogo from '../../../../public/Logo.png';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen sm:flex-row">
      <div className="bg-green-950 flex items-center justify-center flex-1 w-full">
        <div className="flex flex-col w-3/5 items-center flex-wrap ">
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            className="mb-4 max-w-full"
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            className="mb-4 w-full"
          />
          <div
            className=' w-full flex justify-end '
          >
            <Button
              type="submit"
              className="bg-neutral-200 text-green-950 font-bold p-2 rounded h-11 w-full sm:w-32"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white flex items-center justify-center flex-1">
        <div className="text-center">
          <Image
            src={imageLogo}
            alt="Logo mastergas"
            className="w-4/5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
