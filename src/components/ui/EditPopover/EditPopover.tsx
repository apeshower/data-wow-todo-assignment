import React, { useEffect, useRef, useState } from "react";
import { useTodoContext } from "../../../contexts/TodoContext";
import styles from "./EditPopover.module.scss";

interface EditPopoverProps {
  content?: React.ReactNode;
  todoId: string;
  openEditorHandler: () => void;
}

const EditPopover: React.FC<EditPopoverProps> = ({
  openEditorHandler,
  todoId,
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const { deleteTodo } = useTodoContext();

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const openEditHandler = () => {
    setIsPopoverVisible(false);
    openEditorHandler();
  };

  const deledTodoHandler = () => {
    deleteTodo(todoId);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target as Node) &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.moreButton}>
      <div onClick={togglePopover} ref={toggleRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7.19941 11.9999C7.19941 12.6364 6.94656 13.2468 6.49647 13.6969C6.04638 14.147 5.43593 14.3999 4.79941 14.3999C4.16289 14.3999 3.55245 14.147 3.10236 13.6969C2.65227 13.2468 2.39941 12.6364 2.39941 11.9999C2.39941 11.3633 2.65227 10.7529 3.10236 10.3028C3.55245 9.85272 4.16289 9.59986 4.79941 9.59986C5.43593 9.59986 6.04638 9.85272 6.49647 10.3028C6.94656 10.7529 7.19941 11.3633 7.19941 11.9999ZM14.3994 11.9999C14.3994 12.6364 14.1466 13.2468 13.6965 13.6969C13.2464 14.147 12.6359 14.3999 11.9994 14.3999C11.3629 14.3999 10.7524 14.147 10.3024 13.6969C9.85227 13.2468 9.59941 12.6364 9.59941 11.9999C9.59941 11.3633 9.85227 10.7529 10.3024 10.3028C10.7524 9.85272 11.3629 9.59986 11.9994 9.59986C12.6359 9.59986 13.2464 9.85272 13.6965 10.3028C14.1466 10.7529 14.3994 11.3633 14.3994 11.9999ZM19.1994 14.3999C19.8359 14.3999 20.4464 14.147 20.8965 13.6969C21.3466 13.2468 21.5994 12.6364 21.5994 11.9999C21.5994 11.3633 21.3466 10.7529 20.8965 10.3028C20.4464 9.85272 19.8359 9.59986 19.1994 9.59986C18.5629 9.59986 17.9524 9.85272 17.5024 10.3028C17.0523 10.7529 16.7994 11.3633 16.7994 11.9999C16.7994 12.6364 17.0523 13.2468 17.5024 13.6969C17.9524 14.147 18.5629 14.3999 19.1994 14.3999Z"
            fill="#9796A8"
          />
        </svg>
      </div>
      <div
        className={`${styles.dropdown} ${
          isPopoverVisible ? styles.active : ""
        }`}
        ref={popoverRef}
      >
        <div className={styles.edit} onClick={openEditHandler}>
          Edit
        </div>
        <div className={styles.delete} onClick={deledTodoHandler}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default EditPopover;
