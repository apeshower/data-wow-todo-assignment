import React from "react";
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  checked: boolean;
  onClick: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={checked ? styles.checked : ""}>
        <div className={styles.checkIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M7.08333 11.0402L4.75079 8.70762L3.74921 9.7092L7.08333 13.0433L13.9591 6.16754L12.9575 5.16595L7.08333 11.0402Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
