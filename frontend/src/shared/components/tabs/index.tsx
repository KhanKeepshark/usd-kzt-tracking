import type { FC } from "react";
import type { TabsProps } from "./props";
import styles from "./styles.module.scss";

export const Tabs: FC<TabsProps> = ({ items, activeTab, setActiveTab }) => {
  return (
    <div className={styles.container}>
      <div className={styles.items_container}>
        {items.map((item, index) => (
          <div
            className={`${styles.item} ${index === activeTab ? styles.active : ""}`}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
