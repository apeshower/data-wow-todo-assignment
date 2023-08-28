import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../../types";
import { useTodoContext } from "../../../contexts/TodoContext";
import PurpleButton from "../PurpleButton/PurpleButton";
import styles from "./EditInput.module.scss";

interface EditInputProps {
  id: string;
  title: string;
  completed: boolean;
  closeEditorHandler: () => void;
}

const EditInput: React.FC<EditInputProps> = ({
  id,
  title,
  completed,
  closeEditorHandler,
}) => {
  const { updateTodo } = useTodoContext();
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: id,
        title: inputValue.trim(),
        completed: completed,
      };
      updateTodo(newTodo);
      setInputValue(inputValue.trim());
      closeEditorHandler();
    }
  };

  const handleSave = () => {
    const newTodo: Todo = {
      id: id,
      title: inputValue.trim(),
      completed: completed,
    };
    updateTodo(newTodo);
    setInputValue(inputValue.trim());
    closeEditorHandler();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={inputValue}
        ref={inputRef}
      />
      <PurpleButton onClick={handleSave}>Save</PurpleButton>
    </div>
  );
};

export default EditInput;
