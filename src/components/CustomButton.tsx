import { Button } from '@nextui-org/react'

interface CustomButtonProps {
    label: string
    type: "button" | "submit" | "reset" | undefined
}

const CustomButton = ({label, type}: CustomButtonProps) => {
  return (
    <Button className='bg-principal-color text-white pl-14 pr-14 pt-6 pb-6 font-semibold' type={type}>
        {label}
    </Button>
  )
}

export default CustomButton