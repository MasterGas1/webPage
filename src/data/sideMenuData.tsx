import { IoBarChart, IoBasket, IoPerson } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import styles from "@/app/(Admin)/components/ItemSideMenu/ItemSideMenu.module.css";

import { permissionsCategoryEnum } from "./permissionCategory";

interface ItemSideMenu {
  name: string;
  href: string;
  category: permissionsCategoryEnum;
  icon: JSX.Element;
}

const sideMenuData: ItemSideMenu[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    category: permissionsCategoryEnum.DASHBOARD,
    icon: <IoBarChart className={styles.icon} />,
  },
  {
    name: "Servicios",
    href: "/services",
    category: permissionsCategoryEnum.SERVICE,
    icon: <IoBasket className={styles.icon} />,
  },
  {
    name: "Organizaciones",
    href: "/organizations",
    category: permissionsCategoryEnum.COMPANY_INSTALLER,
    icon: <FaBuilding className={styles.icon} />,
  },
  {
    name: "Instaladores",
    href: "/installers",
    category: permissionsCategoryEnum.INSTALLER,
    icon: <IoPerson className={styles.icon} />,
  },
];

export default sideMenuData;
