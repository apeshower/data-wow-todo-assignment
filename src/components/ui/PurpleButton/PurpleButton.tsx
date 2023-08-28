import React from "react";
import styles from "./PurpleButton.module.scss";

interface PupleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const PurpleButton: React.FC<PupleButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default PurpleButton;
