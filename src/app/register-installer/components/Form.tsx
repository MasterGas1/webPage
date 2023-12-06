'use client';

import { Button, ButtonGroup } from '@nextui-org/react';
import { useState } from 'react';
import CustomInput from './CustomInput';

type formTypes = {
  [key: string]: string;
};

const formValues: formTypes = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  rfc: '',
  company: '',
};

const Form = () => {
  const [formData, setFormData] = useState(formValues);

  const inputs = [
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
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
      errorMessage: 'Escribe un teléfono valido',
      patternMatch: '^\\d{10}$',
    },
    {
      id: 4,
      name: 'email',
      type: 'email',
      label: 'Correo Electrónico',
      errorMessage: 'Escribe un correo electrónico valido',
      patternMatch: '^(.+)@(\\S+)$',
    },
    {
      id: 5,
      name: 'address',
      type: 'text',
      label: 'Domicilio',
      errorMessage: 'Escribe un domicilio valido',
      patternMatch: '^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ# .]+$',
    },
    {
      id: 6,
      name: 'rfc',
      type: 'text',
      label: 'RFC',
      errorMessage: 'Escribe un RFC valido',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
    {
      id: 7,
      name: 'company',
      type: 'text',
      label: 'Compañía',
      errorMessage: 'Escribe una compañía valida',
      patternMatch: "^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
    },
  ];

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
      className="flex flex-col gap-4 justify-center items-center w-[580px]"
      autoComplete={'off'}
    >
      {inputs.map((input) => (
        <CustomInput
          key={input.id}
          {...input}
          value={formData[input.name]}
          onChange={handleChange}
        />
      ))}
      <ButtonGroup fullWidth={true}>
        <Button type="submit" size="md" className="bg-green-800 text-white">
          REGISTRAR
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default Form;
