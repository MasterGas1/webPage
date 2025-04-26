"use-client";

import Link from "next/link";

import styles from "./ItemSideMenu.module.css";

interface ItemSideMenuProps {
  name: string;
  href: string;
  icon?: JSX.Element;
  selected?: boolean;
  collapsed?: boolean;
}
const ItemSideMenu = ({
  name,
  href,
  icon,
  collapsed,
  selected,
}: ItemSideMenuProps) => {
  return (
    <Link
      href={href}
      className={`${styles.containerItemMenu} ${
        !collapsed && styles.collapsed
      } ${selected && styles.itemSideMenuSelected}`}
    >
      {icon}
      {collapsed && <span className={styles.textItem}>{name}</span>}
    </Link>
  );
};

export default ItemSideMenu;
