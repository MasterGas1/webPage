import {Navbar, NavbarBrand, Avatar} from '@nextui-org/react'
export function NavBar() {
    return(
        <Navbar className='bg-green-950'>
            <NavbarBrand className='d-flex justify-end w-1'>
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            </NavbarBrand>
        </Navbar>
    )
}