import React, { useState } from "react";
import styles from "./DropDown.module.scss"; // Import the CSS file

interface DropDownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedOption}
        <div className={`${styles.chevron} ${isOpen ? styles.active : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M9.50423 5.4209L6.99998 7.92515L4.49573 5.4209L3.6709 6.24573L6.99998 9.57482L10.3291 6.24573L9.50423 5.4209Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
