'use client';

import { Input } from '@nextui-org/react';
import { useMemo } from 'react';

type Props = {
  name: string;
  type: string;
  label: string;
  errorMessage: string;
  patternMatch: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  name,
  type,
  label,
  errorMessage,
  patternMatch,
  value,
  onChange,
}: Props) => {
  const validateInput = (newValue: string) => newValue.match(patternMatch);

  const isInvalid = useMemo(() => {
    if (value === undefined) return false;
    if (value === '') return false;

    return validateInput(value) ? false : true;
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
          label: 'text-black/50 dark:text-white/90',
          input: ['bg-transparent'],
          inputWrapper: [
            'border-2',
            'group-data-[focus=true]:border-green-700',
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
