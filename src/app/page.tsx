"use client"

import { useRef } from "react";
import { 
  Button, 
  Link, 
  Navbar,
  NavbarContent, 
  NavbarItem 
} from "@nextui-org/react";
import Image from "next/image";

import imageLogo from '../../public/Logo.png'

import { linksLandingPagesData } from "@/data/landingPageData";

export default function Page() {

  const links = useRef(linksLandingPagesData)

  return (
    <div className='bg-white'>
      <Navbar className="bg-principal-color px-3" maxWidth="full">
        <NavbarContent/>
        <NavbarContent justify="center">
          <NavbarContent className="hidden sm:flex gap-20 mr-8" justify="end">
            {
              links.current.map(({name,href},i) => 
                <NavbarItem key={name}>
                  <Link className="text-white" href={href}>
                    {name}
                  </Link>
                </NavbarItem>
              )
              
            }
          </NavbarContent>
          <NavbarContent justify="start" >
            <Button as={Link} className="bg-white text-principal-color font-semibold px-10" href="/">
                Registro
            </Button>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <div className="grid grid-cols-2 gap-4 mt-20">
        <div className="justify-end flex">
          <div className="w-1/2 justify-center flex flex-col">
            <h1 className="text-layout-title text-principal-color font-semibold">
              Registra tus instaladores
            </h1>
            <Button className="bg-principal-color text-white font-semibold w-1/2 mt-20">
              Registro
            </Button>
            <Link className="text-principal-color underline mt-5" href="/">
              Terminos y condiciones
            </Link>
          </div>
        </div>
        <div>
          <Image
            src={imageLogo}
            alt="Logo mastergas"
            className="w-3/5 h-auto"
          />
        </div>
      </div>
    </div>
  )
}

