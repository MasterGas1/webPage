'use client';

import { useRef, useState } from 'react';
import { Checkbox, Spinner } from '@nextui-org/react';

import { useRegisterInstaller } from '@/hook/useRegisterInstaller';

import CustomInput from './CustomInput';
import GroupForm from './GroupForm';
import CustomSelectState from './CustomSelect/CustomSelectState';
import CustomSelectStateCity from './CustomSelect/CustomSelectStateCity';
import CustomButton from '@/components/CustomButton';
import { installersInterface, userInterface } from '@/interfaces/installerInterface';
import Success from './Success';

 interface inputInterface {
  id: number,
  name: | 'name' | 'lastName' | 'rfc' | 'email' | 'companyName' |'phoneNumber' | 'IMSSNumber' | 'employeesNumber' | 'webSite' | 'ownOffice' | 'ownVehicle' | 'state' | 'city' | 'address' | 'specializedTools' | 'certifications' | 'securityCourses' | 'yearsExperiences', 
  label: string,
  type: string,
  errorMessage: string,
  patternMatch: RegExp
 }

const formUserValues: userInterface = {
  name: '',
  lastName: '',
  rfc: '',
  email: '',
}

const formInstallerValues: installersInterface = {
    companyName: '',
    phoneNumber: '',
    IMSSNumber: '',
    employeesNumber: '',
    webSite: '',
    ownOffice: 'false',
    ownVehicle: 'false',
    state: 'Aguascalientes',
    city: '',
    address: '',
    specializedTools: '',
    certifications: '',
    securityCourses: '',
    yearsExperience: '',  
};

const Form = () => {

  const {submitRegister, isLoading, success} = useRegisterInstaller();

  const [formInstallerData, setFormInstallerData] = useState(formInstallerValues);
  const [formUserData, setFormUserData] = useState(formUserValues);

  const isValid = useRef({
    name: false,
    lastName: false,
    rfc: false,
    email: false,
    companyName: false,
    phoneNumber: false,
    IMSSNumber: false,
    employeesNumber: false,
    webSite: false,
    address: false,
    specializedTools: false,
    certifications: false,
    securityCourses: false,
    yearsExperience: false
  });

  const inputsPersonal: inputInterface[] = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      label: 'Nombre(s)',
      errorMessage: 'Escribe un nombre valido',
      patternMatch: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      label: 'Apellido(s)',
      errorMessage: 'Escribe un apellido valido',
      patternMatch: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    {
      id: 3,
      name: 'rfc',
      type: 'text',
      label: 'RFC',
      errorMessage: 'Escribe un RFC valido',
      patternMatch: /^.{13}$/,
    },
    {
      id: 4,
      name: 'email',
      type: 'text',
      label: 'Correo',
      errorMessage: 'Escribe un correo valido',
      patternMatch: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  ];

  const inputsCompany: inputInterface[] = [
    {
      id: 5,
      name: 'companyName',
      type: 'text',
      label: 'Nombre de la empresa',
      errorMessage: 'Escribe un nombre valido',
      patternMatch: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    {
      id: 6,
      name: 'phoneNumber',
      type: 'text',
      label: 'Numero de télefono',
      errorMessage: 'Escribe un numero de telefono valido',
      patternMatch: /^.{10}$/,
    },
    {
      id: 7,
      name: 'IMSSNumber',
      type: 'text',
      label: 'Numero patronal IMSS',
      errorMessage: 'Escribe un numero patronal valido',
      patternMatch: /^.{11}$/,
    },
    {
      id: 8,
      name: 'employeesNumber',
      type: 'number',
      label: 'Numero de empleados',
      errorMessage: 'Escribe un numero valido',
      patternMatch: /^.{1,3}$/
    },
    {
      id: 9,
      name: 'webSite',
      type: 'text',
      label: 'URL Sitio web',
      errorMessage: 'Escribe un url valido',
      patternMatch: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    }
  ];

  const infoCompany = [
    {
      id: 10,
      name: 'specializedTools',
      type: 'text',
      label: 'Herramientas especializadas',
      errorMessage: 'Escribe una herramienta valida',
      patternMatch: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    {
      id: 11,
      name: 'certifications',
      type: 'text',
      label: 'Certificaciones',
      errorMessage: 'Escribe una certificacion valida',
      patternMatch: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    {
      id: 12,
      name: 'securityCourses',
      type: 'text',
      label: 'Cursos de seguridad',
      errorMessage: 'Escribe un curso valido',
      patternMatch: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    {
      id: 13,
      name: 'yearsExperience',
      type: 'number',
      label: 'Años de experiencia',
      errorMessage: 'Escribe un año valido',
      patternMatch: /^.{1,2}$/,
    }
  ]

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormUserData({ ...formUserData, [name]: value });
  };

  const handleInstallerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInstallerData({ ...formInstallerData, [name]: value });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isValid.current)
    if (Object.values(isValid.current).every((value) => value === true) && formInstallerData.state && formInstallerData.city) {
      submitRegister({ ...formUserData, installer: formInstallerData });
    }
  };

  const changeState = (name: string, value: boolean) => {
    isValid.current = ({
      ...isValid.current,
      [name]: value
    })
  }

  return (
      success ? <Success /> : <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center w-full"
        autoComplete={'off'}
      >

          <GroupForm
            name='Datos personales'
          >
            {inputsPersonal.map((input) => (
              <CustomInput
                key={input.id}
                {...input}
                onChange={handleUserChange}
                patternMatch={input.patternMatch}
                value={formUserData[input['name'] as keyof typeof formUserData]}
                setIsValid={changeState}
              />
            ))}
          </GroupForm>

          <GroupForm
            name='Datos de la empresa'
          >
            {inputsCompany.map((input) => (
              <CustomInput
                key={input.id}
                {...input}
                onChange={handleInstallerChange}
                patternMatch={input.patternMatch}
                value={formInstallerData[input['name'] as keyof typeof formInstallerData]}
                setIsValid={changeState}
              />
            ))}

            <div className='flex flex-col'>
              <span className='text-black font-semibold'>Cuenta con ...</span>
              <div className='mt-2'>
                <Checkbox 
                  color='success'
                  isSelected={formInstallerData.ownOffice === 'true'}
                  onValueChange={(e) => setFormInstallerData({ ...formInstallerData, ownOffice: e.toString()})}
                >
                    Oficina propia
                </Checkbox>
                <Checkbox 
                  className='ml-4' 
                  color='success'
                  isSelected={formInstallerData.ownVehicle === 'true'}
                  onValueChange={(e) => setFormInstallerData({ ...formInstallerData, ownVehicle: e.toString()})}
                >
                  Vechiculo propia
                </Checkbox>
              </div>
            </div>
          </GroupForm>

          <GroupForm
            name='Ubicación de la empresa'
          >
            <CustomSelectState onChange={handleInstallerChange}/>
            <CustomSelectStateCity state={formInstallerData.state} onChange={handleInstallerChange}/>
            <CustomInput 
              name="address" 
              type='text' 
              label='Dirección' 
              errorMessage='Escribe una direccion valida' 
              patternMatch={/^[A-Za-z0-9 -]+$/}
              onChange={handleInstallerChange}
              value={formInstallerData.address}
              setIsValid={changeState}
            />
          </GroupForm>

          <GroupForm
            name='Giro de la empresa'
          >
            {
              infoCompany.map((input) => (
                <CustomInput
                  key={input.id}
                  {...input}
                  onChange={handleInstallerChange}
                  patternMatch={input.patternMatch}
                  value={formInstallerData[input['name'] as keyof typeof formInstallerData]}
                  setIsValid={changeState}
                />
              ))
            }
          </GroupForm>

          <div className='w-full flex justify-end'>
            <CustomButton
              label='REGISTRAR'
              type='submit'
            />
        </div>
        
        {isLoading && 
          <div className="bg-black bg-opacity-50 flex w-full h-full items-center justify-center flex-1 absolute">
            <Spinner color='success'/>
          </div>}
      </form>
    );
};

export default Form;
