'use client'

import React, { useContext, useState } from 'react'
import { Tabs, Tab, Card, CardBody, useDisclosure } from '@nextui-org/react';

import { Context as ContextInstaller } from '@/context/InstallerContext';

import TableInstaller from './components/TableInstaller';
import ModalInstaller from './components/ModalInstaller';

const page = () => {

  const {state} = useContext(ContextInstaller)

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [status, setStatus] = useState('');

  return (
    <div
        className='p-10 w-full flex flex-col justify-center'
    >
        <ModalInstaller
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          status={status}
        />
        <div className='flex w-full justify-center mb-2'>
            <h1 className='font-bold text-principal-color text-3xl'>Instaladores</h1>

        </div>
        <Tabs aria-label="Options">
            <Tab key="actives" title="Activos">
              <TableInstaller
                status='approved'
                installers={state.installersApproved}
                onOpen={onOpen}
                setStatus={setStatus}
              />
            </Tab>
            <Tab key="requests" title="Solicitudes">
              <TableInstaller
                status='pending'
                installers={state.installersPending}
                onOpen={onOpen}
                setStatus={setStatus}
              />
            </Tab>
          </Tabs>
    </div>
  )
}

export default page