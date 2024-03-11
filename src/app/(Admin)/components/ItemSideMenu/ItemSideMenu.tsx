'use-client'

import Link from 'next/link'

import styles from './ItemSideMenu.module.css'

interface ItemSideMenuProps {
    name: string,
    href: string,
    icon?: JSX.Element
}
const ItemSideMenu = ({name, href, icon}: ItemSideMenuProps) => {
  return (
    <Link href={href} className={styles.containerItem}>
        {icon}
        <span className={styles.textItem}>
            {name}
        </span>
    </Link>
  )
}

export default ItemSideMenu