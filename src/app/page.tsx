import { 
  Button, 
  Link, 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem 
} from "@nextui-org/react";

export default function Page() {

  return (
    <div className='bg-white'>
      <Navbar className="bg-principal-color px-3" maxWidth="full">
        <NavbarContent/>
        <NavbarContent justify="center">
          <NavbarContent className="hidden sm:flex gap-20 mr-8" justify="end">
            <NavbarItem>
              <Link className="text-white">
                Servicios
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="text-white">
                Contacto
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="text-white">
                Acerca de Mastergas
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="start" >
            <Button as={Link} className="bg-white text-principal-color font-semibold px-10" >
                Registro
            </Button>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <div className="grid grid-cols-2 gap-4 border-solid border-2 border-sky-500 ">
        <div>
          <p>Registrate</p>
        </div>
        <div>
          <p>Image</p>
        </div>
      </div>
    </div>
  )
}

