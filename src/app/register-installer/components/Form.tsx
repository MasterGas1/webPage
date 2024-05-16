'use client';

import { useState } from 'react';
import { Checkbox } from '@nextui-org/react';

import CustomInput from './CustomInput';
import GroupForm from './GroupForm';
import CustomSelectState from './CustomSelect/CustomSelectState';
import CustomSelectStateCity from './CustomSelect/CustomSelectStateCity';
import CustomButton from '@/components/CustomButton';

type formTypes = {
  [key: string]: string | any;
};

const formValues: formTypes = {
  name: '',
  lastName: '',
  rfc: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  employerNumber: '',
  employees: '',
  webSite: '',
  ownOffice: 'false',
  ownVehicle: 'false',
  state: '',
  city: '',
  address: '',
  specializedTools: '',
  certifications: '',
  securityCourse: '',
  yearExperience: '',
};

const Form = () => {
  const [formData, setFormData] = useState(formValues);

  const inputsPersonal = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      label: 'Nombre(s)',
      errorMessage: 'Escribe un nombre valido',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      label: 'Apellido(s)',
      errorMessage: 'Escribe un apellido valido',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 3,
      name: 'rfc',
      type: 'text',
      label: 'RFC',
      errorMessage: 'Escribe un RFC valido',
      patternMatch: '^\\d{13}$',
    }
  ];

  const inputsCompany = [
    {
      id: 1,
      name: 'companyName',
      type: 'text',
      label: 'Nombre de la empresa',
      errorMessage: 'Escribe un nombre valido',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 2,
      name: 'email',
      type: 'text',
      label: 'Correo',
      errorMessage: 'Escribe un correo valido',
      patternMatch: "^(.+)@(\\S+)$",
    },
    {
      id: 3,
      name: 'phoneNumber',
      type: 'text',
      label: 'Numero de télefono',
      errorMessage: 'Escribe un RFC valido',
      patternMatch: '^\\d{10}$',
    },
    {
      id: 4,
      name: 'employerNumber',
      type: 'text',
      label: 'Numero patronal IMSS',
      errorMessage: 'Escribe un numero valido',
      patternMatch: '^\\d{10}$',
    },
    {
      id: 5,
      name: 'employees',
      type: 'text',
      label: 'Numero de empleados',
      errorMessage: 'Escribe un numero valido',
      patternMatch: '^\\d{10}$',
    },
    {
      id: 6,
      name: 'webSite',
      type: 'text',
      label: 'URL Sitio web',
      errorMessage: 'Escribe un url valido',
      patternMatch: '^\\d{10}$',
    }
  ];

  const infoCompany = [
    {
      id: 1,
      name: 'specializedTools',
      type: 'text',
      label: 'Herramientas especializadas',
      errorMessage: 'Escribe una herramienta valida',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 2,
      name: 'certifications',
      type: 'text',
      label: 'Certificaciones',
      errorMessage: 'Escribe una certificacion valida',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 3,
      name: 'securityCourse',
      type: 'text',
      label: 'Cursos de seguridad',
      errorMessage: 'Escribe un curso valido',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 4,
      name: 'yearExperience',
      type: 'text',
      label: 'Anos de experiencia',
      errorMessage: 'Escribe un año valido',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
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
              onChange={handleChange}
              patternMatch={input.patternMatch}
              value={formData[input.name]}
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
              onChange={handleChange}
              patternMatch={input.patternMatch}
              value={formData[input.name]}
            />
          ))}

          <div className='flex flex-col'>
            <span className='text-black font-semibold'>Cuenta con ...</span>
            <div className='mt-2'>
              <Checkbox 
                color='success'
                isSelected={formData.ownOffice === 'true'}
                onValueChange={(e) => setFormData({ ...formData, ownOffice: e.toString()})}
              >
                  Oficina propia
              </Checkbox>
              <Checkbox 
                className='ml-4' 
                color='success'
                isSelected={formData.ownVehicle === 'true'}
                onValueChange={(e) => setFormData({ ...formData, ownVehicle: e.toString()})}
              >
                Vechiculo propia
              </Checkbox>
            </div>
          </div>
        </GroupForm>

        <GroupForm
          name='Ubicación de la empresa'
        >
          <CustomSelectState onChange={handleChange}/>
          <CustomSelectStateCity state={formData.state} onChange={handleChange}/>
          <CustomInput 
            name="address" 
            type='text' 
            label='Dirección' 
            errorMessage='Escribe una direccion valida' 
            patternMatch='^[A-Za-z0-9 -]+$'
            onChange={handleChange}
            value={formData.address}
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
                onChange={handleChange}
                patternMatch={input.patternMatch}
                value={formData[input.name]}
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
    </form>
  );
};

export default Form;
