import React, { useState } from "react";
import { useTodoContext } from "../../../contexts/TodoContext";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function
import styles from "./AddInput.module.scss";
import { Todo } from "../../../types";

const AddInput = () => {
  const { addTodo } = useTodoContext();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTodo: any = {
        id: uuidv4(), // Generate a unique UUID
        title: inputValue.trim(),
        completed: false,
      };
      addTodo(newTodo);
      setInputValue("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add your todo..."
      />
    </div>
  );
};

export default AddInput;
