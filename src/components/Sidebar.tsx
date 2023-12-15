import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from '../svg/mastergasLogo.webp'
import DashboardIcon from '../assets/icons/Dashboard'
import ServicesIcon from '../assets/icons/Services'


const SidebarMenu = () => {

    return (
        <div className="h-screen px-4 pt-8 pb-4 bg-light flex flex-col w-80">
            <div className="flex flex-col">
                <div className="flex items-center pl-1 gap-4">
                    <Image
                        className="w-28 h-28"
                        src={Logo}
                        alt='Example'
                    />
                    <span className="text-lg font-medium">MasterGas23</span> 
                </div>
            </div>
            <div className="flex flex-col items-start mt-10">
                <div className="flex items-center cursor-pointer text-black hover:bg-green-950 hover:text-white hover:fill-white rounded w-full overflow-hidden whitespace-nowrap px-4">
                    <Link href={'#'}>
                        <div className="flex py-4 px-9items-center w-full h-full">
                            <DashboardIcon className="fill-green-95 w-9" />
                            <span className="text-md font-medium">Dashboard</span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center cursor-pointer text-black hover:bg-green-950 hover:text-white hover:fill-white rounded w-full overflow-hidden whitespace-nowrap px-4">
                    <Link href={'#'}>
                        <div className="flex py-4 px-9items-center w-full h-full">
                            <ServicesIcon className="fill-green-95 w-9" />
                            <span className="text-md font-medium">Servicios</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;