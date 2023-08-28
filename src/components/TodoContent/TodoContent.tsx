import React, { useEffect } from "react";
import TodoWrapper from "../TodoWrapper/TodoWrapper";
import ProgressContent from "../ProgressContent/ProgressContent";
import styles from "./TodoContent.module.scss";
import TaskContent from "../TaskContent/TaskContent";
import { useTodoContext } from "../../contexts/TodoContext";

const TodoContent = () => {
  const { fetchTodoLists, successPercentage, completedLists } =
    useTodoContext();

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return (
    <div className={styles.container}>
      <TodoWrapper>
        <ProgressContent
          successPercentage={successPercentage}
          completedLists={completedLists}
        />
        <TaskContent />
      </TodoWrapper>
    </div>
  );
};

export default TodoContent;
