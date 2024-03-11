import Image from "next/image"

import ItemSideMenu from "../ItemSideMenu/ItemSideMenu"

import styles from './SideMenu.module.css';

import sideMenuData from "@/data/sideMenuData"
import imageLogo from '../../../../../public/LogoMastergas.png';

const SideMenu = () => {
  return (
    <div className={styles.containerSideMenu}>
        <div className={styles.containerLogo}>
        <Image className="w-1/5"  src={imageLogo} alt="logo" priority/>
        <span className={styles.textLogo}>MasterGas23</span>
        </div>
        
        <div className={styles.containerItems}>
        {
            sideMenuData.map(({name, href, icon}) => (
            <ItemSideMenu 
                key={name}
                name={name}
                href={href}
                icon={icon}
            />
            ))
        }
        </div>
    </div>

  )
}

export default SideMenu