'use client'

import React, { useContext } from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

import { Context as ContextInstaller } from '@/context/InstallerContext';

import TableInstaller from './components/TableInstaller';

const page = () => {

  const {state} = useContext(ContextInstaller)

  return (
    <div
        className='p-10 w-full flex flex-col justify-center'
    >
        <div className='flex w-full justify-center mb-2'>
            <h1 className='font-bold text-principal-color text-3xl'>Instaladores</h1>

        </div>
        <Tabs aria-label="Options">
            <Tab key="actives" title="Activos">
              <TableInstaller
                status='approved'
                installers={state.installersApproved}
              />
            </Tab>
            <Tab key="requests" title="Solicitudes">
              <TableInstaller
                status='pending'
                installers={state.installersPending}
              />
            </Tab>
          </Tabs>
    </div>
  )
}

export default page