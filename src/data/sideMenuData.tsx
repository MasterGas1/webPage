import { IoBarChart, IoBasket, IoPerson } from "react-icons/io5";
import styles from '@/app/(Admin)/components/ItemSideMenu/ItemSideMenu.module.css'

interface ItemSideMenu {
    name: string
    href: string
    icon: JSX.Element
}

const sideMenuData: ItemSideMenu[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: <IoBarChart className={styles.icon}/>
    },
    {
        name: "Servicios",
        href: "/service",
        icon: <IoBasket className={styles.icon}/>
    },
    {
        name: "Instaladores",
        href: "/installer",
        icon: <IoPerson className={styles.icon}/>
    }
]

export default sideMenuData;