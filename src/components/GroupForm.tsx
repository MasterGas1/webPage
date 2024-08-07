import Spacer from "@/components/Spacer"

const GroupForm = ({children, name}: Readonly<{children: React.ReactNode, name: string}>) => {
  return (
    <div className="w-full">
        <h3 className='text-2xl text-black font-semibold'>{name}</h3>
        <div className="w-full border-t-4 border-color-principal "/>
        
        <div className="w-full flex-row mt-2 grid grid-cols-3 gap-4">
            {children}
        </div>
    </div>
  )
}

export default GroupForm