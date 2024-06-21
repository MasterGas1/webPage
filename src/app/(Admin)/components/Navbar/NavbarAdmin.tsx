'use client'

import React, { useContext } from 'react'
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { Context as AuthContext } from '@/context/AuthContext'

const NavbarAdmin = () => {

    const router = useRouter()

    const {signout} = useContext(AuthContext)

    const handleSignout = () => {
        signout()
        router.push('/login-manager')
    }

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
                    <DropdownItem 
                        key="logout" 
                        color="danger"
                        onClick={handleSignout}
                    >
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    </Navbar>
  )
}

export default NavbarAdmin