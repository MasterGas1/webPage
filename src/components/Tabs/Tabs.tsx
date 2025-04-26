import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import styles from "./Tabs.module.css";

interface TabProps {
  title: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}
const Tabs: FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabButtons}>
        {children.map((child, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              index === activeIndex && styles.active
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {children[activeIndex].props.children}
      </div>
    </div>
  );
};

export const Tab: FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export default Tabs;
