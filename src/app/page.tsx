import { Button } from '@nextui-org/react'

import Image from 'next/image'

import Example from '../svg/example.svg'

export default function Page() {

  return (
    <div>
        <Button className='bg-slate-400' color='primary' variant='bordered'>
          <Image
            src={Example}
            alt='Example'
          />
        </Button>
    </div>
  )
}

