import { ReactNode } from "react";
import styles from "./Container.module.css";

export const Container = (props: {
  children: ReactNode;
  style?: Record<string, string | number>;
}) => {
  const { children, style } = props;
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};
