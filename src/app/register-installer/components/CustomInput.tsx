'use client';

import { Input } from '@nextui-org/react';
import { useMemo } from 'react';

type Props = {
  name: string;
  type: string;
  label: string;
  errorMessage: string;
  patternMatch: RegExp;
  value: string | any
  setIsValid: (name: string, value: boolean) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  name,
  type,
  label,
  errorMessage,
  value,
  patternMatch,
  setIsValid,
  onChange,
}: Props) => {
  //const validateInput = (newValue: string) => newValue.match(patternMatch);

  const isInvalid = useMemo(() => {
    if (value === undefined) {
      setIsValid(name, false)
      return false
    };
    if (value === '') {
      setIsValid(name, false)
      return false;
    }
    if (!value.match(patternMatch)) {
      setIsValid(name, false)
      return true;
    } else {
      setIsValid(name, true)
    }
    //return validateInput(value) ? false : true;
  }, [value]);

  return (
    <>
      <Input
        name={name}
        type={type}
        label={label}
        variant="bordered"
        fullWidth={true}
        // color="success-50"
        // className="max-w-lg"
        classNames={{
          label: 'text-principal-color dark:text-white/90 text-md',
          input: ['bg-transparent'],
          inputWrapper: [
            'border-3',
            'group-data-[focus=true]:border-principal-color',
          ],
          innerWrapper: ['bg-transparent'],
        }}
        isInvalid={isInvalid}
        errorMessage={isInvalid && errorMessage}
        value={value}
        onChange={onChange}
        isRequired
      />
    </>
  );
};

export default CustomInput;
