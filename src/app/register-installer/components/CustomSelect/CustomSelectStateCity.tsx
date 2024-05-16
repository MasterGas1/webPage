import { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'

import estadosMunicipios from '@/jsons/estados-municipios.json'

type StateType = keyof typeof estadosMunicipios

interface CustomSelectStateCityProps {
  state: StateType
  onChange: Function
}

const CustomSelectStateCity = ({state, onChange}: CustomSelectStateCityProps) => {

  const [cityState, setCityState] = useState<string[]>([]);

  useEffect(() => {
    if (state in estadosMunicipios) {
      const cities = estadosMunicipios[state]
      setCityState(cities);
    }
  },[state])

  return (
    <Select
        label={"Ciudad"}
        className='max-w-s'
        isRequired={true}
        name='city'
        classNames={{
          label: 'text-principal-color text-md',
          mainWrapper: [
          'border-3',
          'rounded-2xl',
          ],
          innerWrapper: ['bg-transparent'],
          base: 'bg-transparent',
        }}
        onChange={(e) => onChange(e)}
    >{cityState.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
    </Select>
  )
}

export default CustomSelectStateCity