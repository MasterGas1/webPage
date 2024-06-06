'use client'

import { ToastContainer } from 'react-toastify';

import Form from './components/Form';

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-full h-screen bg-principal-color p-10">
     <div className='w-full h-full bg-white rounded-lg flex-row justify-center p-8'>

      <div>
        <h2 className='text-6xl text-principal-color font-bold text-center'>Bienvenido</h2>
        <h3 className='text-2xl text-principal-color font-semibold text-center'>REGISTRO DE INSTALADOR</h3>
      </div>

      <Form/>
     </div>
     <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default page;
