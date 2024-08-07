import React, { useContext } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

import GroupForm from '@/components/GroupForm'
import CustomTextField from './CustomTextField'

import { Context as ContextInstaller } from '@/context/InstallerContext';
import CustomButton from '@/components/CustomButton';

interface ModalInstallerProps {
  isOpen: boolean,
  status: string,
  onOpenChange: () => void
  
}

const ModalInstaller = ({isOpen, status, onOpenChange}: ModalInstallerProps) => {

  const {state, changeStatus} = useContext(ContextInstaller)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className='w-5/6 h-5/6'
      size='full'
      scrollBehavior='inside'
    >
      <ModalContent>
        {
          (onClose) => (
            <>
              <ModalHeader className="text-principal-color text-center text-2xl font-bold">
                Información del Instalador
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col justify-center items-center p-5">
                  <GroupForm
                    name='Datos personales'
                  >
                    <CustomTextField
                      label='Nombre(s):'
                      data={state.installer?.name}
                    />

                    <CustomTextField
                      label="Apellido(s):"
                      data={state.installer?.lastName}
                    />

                    <CustomTextField
                      label="RFC:"
                      data={state.installer?.rfc}
                    />

                    <CustomTextField
                      label="Correo:"
                      data={state.installer?.email}
                    />
                  </GroupForm>
                  <br/>

                  <GroupForm
                    name='Datos de la empresa'
                  >
                    <CustomTextField
                      label="Nombre de la empresa:"
                      data={state.installer?.installerId.companyName}
                    />

                    <CustomTextField
                      label="Numero de telefonico:"
                      data={state.installer?.installerId.phoneNumber}
                    />

                    <CustomTextField
                      label="Numero Patronal IMSS:"
                      data={state.installer?.installerId.IMSSNumber}
                    />

                    <CustomTextField
                      label="Numero de empleados:"
                      data={state.installer?.installerId.employeesNumber}
                    />

                    <CustomTextField
                      label="URL Sitio web:"
                      data={state.installer?.installerId.website}
                    />

                    <CustomTextField
                      label="Oficina propia:"
                      data={state.installer?.installerId.ownOffice ? 'Si' : 'No'}
                    />

                    <CustomTextField
                      label="Vehiculo propio:"
                      data={state.installer?.installerId.ownVehicle ? 'Si' : 'No'}
                    />
                  </GroupForm>
                  <br/>

                  <GroupForm
                    name='Ubicación de la empresa'
                  >
                    <CustomTextField
                      label="Estado:"
                      data={state.installer?.installerId.state}
                    />

                    <CustomTextField
                      label="Ciudad:"
                      data={state.installer?.installerId.city}
                    />

                    <CustomTextField
                      label="Dirección:"
                      data={state.installer?.installerId.address}
                    />
                  </GroupForm>
                  <br/>

                  <GroupForm
                    name='Giro de la empresa'
                  >
                    <CustomTextField
                      label="Herramientas especializadas:"
                      data={state.installer?.installerId.specializedTools}
                    />

                    <CustomTextField
                      label="Certificaciones:"
                      data={state.installer?.installerId.certifications}
                    />

                    <CustomTextField
                      label="Cursos de seguridad:"
                      data={state.installer?.installerId.securityCourses}
                    />

                    <CustomTextField
                      label="Años de expeirencia:"
                      data={state.installer?.installerId.yearsExperience}
                    />
                  </GroupForm>
                </div>
              </ModalBody>
              <ModalFooter>
                {
                  status === 'pending' &&(
                    <>
                      <CustomButton
                        label='Rechazar'
                        type='button'
                        color='bg-error-color'
                        onClick={()=>{
                          onClose()
                          changeStatus(state.installer?._id!, 'rejected')
                        }}
                      />
      
                      <CustomButton
                        label='Aceptar'
                        type='button'
                        onClick={()=>{
                          onClose()
                          changeStatus(state.installer?._id!, 'approved')
                        }}
                      />
                    </>
                  )
                }
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  )
}

export default ModalInstaller