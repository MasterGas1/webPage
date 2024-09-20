import { Button } from '@nextui-org/react'

interface CustomButtonProps {
    label: string
    type: "button" | "submit" | "reset" | undefined
    onClick?: () => void
    color ?: "bg-principal-color" | "bg-error-color"
}

const CustomButton = ({label, type, color='bg-principal-color', onClick}: CustomButtonProps) => {

  return (
    <Button 
      className={`${color} text-white pl-14 pr-14 pt-6 pb-6 font-semibold text-lg`} 
      type={type}
      onClick={onClick}
    >
        {label}
    </Button>
  )
}

export default CustomButton