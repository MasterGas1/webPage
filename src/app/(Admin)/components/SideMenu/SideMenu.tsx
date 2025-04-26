"use client";

import Image from "next/image";
import { useState } from "react";
import { RiExpandRightFill, RiExpandLeftLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import ItemSideMenu from "../ItemSideMenu/ItemSideMenu";

import styles from "./SideMenu.module.css";

import sideMenuData from "@/data/sideMenuData";
import imageLogo from "../../../../../public/LogoMastergas.png";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles.containerSideMenu} ${
        !isOpen ? styles.collapsed : ""
      }`}
    >
      <div className={styles.containerLogo}>
        <Image
          className={isOpen ? "w-1/4" : "w-5/6"}
          src={imageLogo}
          alt="logo"
          priority
        />
        {isOpen && <span className={styles.textLogo}>MasterGas23</span>}
      </div>

      <div className={styles.containerItems}>
        {sideMenuData.map(({ name, href, icon }) => (
          <ItemSideMenu
            key={name}
            name={name}
            href={href}
            icon={icon}
            collapsed={isOpen}
            selected={pathname === href}
          />
        ))}
      </div>

      <button onClick={toggleMenu} className={styles.toggleButton}>
        {!isOpen ? <RiExpandRightFill /> : <RiExpandLeftLine />}
      </button>
    </div>
  );
};

export default SideMenu;
