'use client'

import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'

const NavbarAdmin = () => {
  return (
    <Navbar className="bg-principal-color px-3" maxWidth='full'>
        <NavbarContent as='div' justify='end'>
            <Dropdown placement='bottom-end'>
                <DropdownTrigger className='cursor-pointer'>
                    <Avatar
                        isBordered
                        color='default'
                        className='transition-transform'
                        name='Admin'
                        size='md'
                        src='https://res.cloudinary.com/dnesdnfxy/image/upload/v1700172676/mastergas23/users/nrtsecwphzvysmcddswx.png'
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Usuario</p>
                    <p className="font-semibold">admin@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                    Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    </Navbar>
  )
}

export default NavbarAdmin