import Image from 'next/image'
import styles from './page.module.css'
import { Button } from '@nextui-org/react'

export default function Page() {
  return (
    <div>
        <Button className='bg-slate-400' color='primary' variant='bordered'>Click me</Button>
    </div>
  )
}
