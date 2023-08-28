import React from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  progress: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className={styles.progress}>
      <div
        className={styles.progressDone}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
