'use client'

import { useContext, useEffect } from "react"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { IoEllipsisVerticalOutline } from "react-icons/io5"
import { installerResponseInterface } from "@/interfaces/installerInterface"

import { Context as ContextInstaller } from "@/context/InstallerContext"

interface TableInstallerProps {
  status: string,
  installers: installerResponseInterface[],
  setStatus: (status: string) => void
  onOpen: () => void
}

const TableInstaller = ({status, installers, onOpen, setStatus}: TableInstallerProps) => {

  const {getInstallers, getInstaller} = useContext(ContextInstaller)

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
        <TableBody
          emptyContent="No hay instaladores registrados"
        >
            {
              installers.map((installer) => (
                <TableRow
                  onDoubleClick={() => {
                    onOpen()
                    getInstaller(installer._id)
                    setStatus(status)
                  }}
                  className="cursor-pointer"
                  key={installer._id}
                >
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