import React from "react";
import styles from "./ProgressContent.module.scss";
import ProgressBar from "./ProgressBar/ProgressBar";

interface ProgressContentProps {
  successPercentage: string;
  completedLists: number;
}

const ProgressContent: React.FC<ProgressContentProps> = ({
  successPercentage,
  completedLists,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Progress</div>
      <ProgressBar progress={successPercentage} />
      <div className={styles.doneText}>{completedLists} completed</div>
    </div>
  );
};

export default ProgressContent;
