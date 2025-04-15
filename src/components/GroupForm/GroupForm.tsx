import styles from "./GroupForm.module.css";

const GroupForm = ({
  children,
  name,
}: Readonly<{ children: React.ReactNode; name: string }>) => {
  return (
    <div className={styles.groupFormContainer}>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.underline} />

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default GroupForm;
