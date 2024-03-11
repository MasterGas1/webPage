import { IoBarChart, IoBasket } from "react-icons/io5";
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
        href: "/services",
        icon: <IoBasket className={styles.icon}/>
    }
]

export default sideMenuData;