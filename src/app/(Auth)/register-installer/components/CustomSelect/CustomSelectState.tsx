import { Select, SelectItem } from '@nextui-org/react'

import estados from '@/jsons/estados.json'

interface CustomSelectStateProps {
  onChange: Function
}

const CustomSelectState = ({onChange}: CustomSelectStateProps) => {
  return (
    <Select
        label={"Estados"}
        isRequired={true}
        classNames={{
          label: 'text-principal-color text-md',
          mainWrapper: [
          'border-3',
          'rounded-2xl',
          ],
          innerWrapper: ['bg-transparent'],
          base: 'bg-transparent',
        }}
        name='state'
        onChange={(e) => onChange(e)}
    >{estados.map(({clave, nombre}) => <SelectItem 
      key={nombre} 
      value={clave}
      >
        {nombre}
      </SelectItem>)}
    </Select>
  )
}

export default CustomSelectState