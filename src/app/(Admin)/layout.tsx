
import NavbarAdmin from './components/Navbar/NavbarAdmin';
import SideMenu from './components/SideMenu/SideMenu';


const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-row min-h-screen max-h-screen min-w-screen max-w-screen'>
        <SideMenu/>
        <div className='w-full'>
          <NavbarAdmin/>
          {children}
        </div>
    </div>
  )
}

export default layout