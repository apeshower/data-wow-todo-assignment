import React, { useState } from "react";
import styles from "./TaskList.module.scss";
import CheckBox from "../../ui/CheckBox/CheckBox";
import EditInput from "../../ui/EditInput/EditInput";
import EditPopover from "../../ui/EditPopover/EditPopover";
import { Todo } from "../../../types";

interface TaskListProps {
  todo: Todo;
  id: string;
  title: string;
  checked: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const TaskList: React.FC<TaskListProps> = ({
  id,
  title,
  checked,
  onClick,
  style,
}) => {
  const [openEditor, setOpenEditor] = useState(false);

  const openEditorHandler = () => {
    setOpenEditor(true);
  };

  const closeEditorHandler = () => {
    setOpenEditor(false);
  };

  return (
    <div
      className={`${styles.wrapper} ${openEditor ? styles.editing : ""}`}
      style={style}
    >
      <CheckBox checked={checked} onClick={onClick} />
      {openEditor ? (
        <div className={styles.editor}>
          <EditInput
            id={id}
            title={title}
            completed={checked}
            closeEditorHandler={closeEditorHandler}
          />
        </div>
      ) : (
        <div className={`${styles.title} ${checked ? styles.checked : ""}`}>
          {title}
        </div>
      )}
      {!openEditor && (
        <EditPopover todoId={id} openEditorHandler={openEditorHandler} />
      )}
    </div>
  );
};

export default TaskList;
