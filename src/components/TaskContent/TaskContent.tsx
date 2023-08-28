import React, { useEffect, useState } from "react";
import styles from "./TaskContent.module.scss";
import TaskList from "./TaskList/TaskList";
import { Todo } from "../../types";
import { filterOptions, useTodoContext } from "../../contexts/TodoContext";
import DropDown from "../ui/DropDown/DropDown";
import AddInput from "../ui/AddInput/AddInput";
import FadeInUpWhenVisible from "../FadeInUpWhenVisible/FadeInUpWhenVisible";

const TaskContent = () => {
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const { todoLists, filterTodoLists, updateTodo } =
    useTodoContext();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todoLists);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const updateTodos = (option: string) => {
    filterTodoLists(option);
    if (option === "All") {
      setFilteredTodos(todoLists);
    } else {
      const completed = option === "Done" ? true : false;
      const filteredTasks = todoLists.filter(
        (item: Todo) => item.completed == completed
      );
      setFilteredTodos(filteredTasks);
    }
  };

  const toggleChecklistHandler = (item: Todo) => {
    const updatedItem = { ...item, completed: !item.completed };
    updateTodo(updatedItem);
  };

  useEffect(() => {
    updateTodos(selectedOption);
    if (selectedOption === "All") {
      setFilteredTodos(todoLists);
    }
  }, [selectedOption, todoLists]);

  return (
    <div className={styles.container}>
      <div className={styles.headingBox}>
        <div className={styles.title}>Tasks</div>
        <div>
          <DropDown
            options={filterOptions}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
        </div>
      </div>
      {filteredTodos.map((item: Todo, index: number) => (
        <FadeInUpWhenVisible
          duration={0.53}
          ease={"easeOut"}
          delay={0}
          yOffset={20}
          isVisible={true}
          key={item.id}
        >
          <TaskList
            key={item.id}
            todo={item}
            id={item.id}
            title={item.title}
            checked={item.completed}
            onClick={() => toggleChecklistHandler( item)}
            style={{ zIndex: filteredTodos.length - index }}
          />
        </FadeInUpWhenVisible>
      ))}
      <AddInput />
    </div>
  );
};

export default TaskContent;
