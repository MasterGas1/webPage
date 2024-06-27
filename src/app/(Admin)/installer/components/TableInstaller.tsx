'use client'

import { useContext, useEffect } from "react"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { IoEllipsisVerticalOutline } from "react-icons/io5"
import { installerResponseInterface } from "@/interfaces/installerInterface"

import { Context as ContextInstaller } from "@/context/InstallerContext"

interface TableInstallerProps {
  status: string,
  installers: installerResponseInterface[]
}

const TableInstaller = ({status, installers}: TableInstallerProps) => {

  const {getInstallers} = useContext(ContextInstaller)

  useEffect(() => {
    
    getInstallers(status)
  }, [])

  return (
    <Table 
      aria-label="Active table"
      selectionMode="single"  
    >
        <TableHeader>
          <TableColumn width={600}>Nombre</TableColumn>
          <TableColumn>Compañia</TableColumn>
          <TableColumn>Correo electronico</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
            {
              installers.map((installer) => (
                <TableRow>
                  <TableCell>{`${installer.name} ${installer.lastName}`}</TableCell>
                  <TableCell>{installer.installerId.companyName}</TableCell>
                  <TableCell>{installer.email}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                        <Button size='lg' radius='full' isIconOnly className='bg-transparent text-black'>
                          <IoEllipsisVerticalOutline size={40}/>
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
        </TableBody>
    </Table>
  )
}

export default TableInstaller