import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "../types";
import { toast } from "react-hot-toast";

interface TodoContextType {
  todoLists: Todo[];
  successPercentage: string;
  completedLists: number;
  fetchTodoLists: () => void;
  filterTodoLists: (completed: string) => void;
  addTodo: (newTodo: Todo) => Promise<void>;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
}

interface TodoProviderProps {
  children: React.ReactNode;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const filterOptions = ["All", "Done", "Undone"];
export const API_URL = "http://localhost:3001";

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [successPercentage, setSuccessPercentage] = useState<string>("0");
  const [completedLists, setCompletedLists] = useState<number>(0);
  const [filterOption, setFilterOption] = useState<string>(filterOptions[0]);

  const filterTodoLists = async (option: string) => {
    setFilterOption(option);
  };

  const calculateSuccessPercentage = (todos: Todo[]) => {
    const completedTaskCount = todos.filter((item) => item.completed).length;
    const percentage = ((completedTaskCount / todos.length) * 100).toFixed(2);
    return percentage.toString(); // Convert to string
  };

  const calculateCompletedTasks = (todos: Todo[]) => {
    const completedTaskCount = todos.filter(
      (item: Todo) => item.completed
    ).length;
    return completedTaskCount;
  };

  const fetchTodoLists = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTodoLists(res.data);
      setSuccessPercentage(calculateSuccessPercentage(res.data));
      setCompletedLists(calculateCompletedTasks(res.data));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const updateSuccessPercentage = () => {
    setSuccessPercentage(calculateSuccessPercentage(todoLists));
  };

  const updateCompletedLists = () => {
    setCompletedLists(calculateCompletedTasks(todoLists));
  };

  const addTodo = async (newTodo: Todo) => {
    let intialTodoLists: Todo[] = todoLists;
    try {
      if (filterOption !== "Done") {
        setTodoLists((prevTodos) => [...prevTodos, newTodo]);
      }
      const res = await axios.post(`${API_URL}/todos`, newTodo);
      toast.success(`Added ${newTodo.title}`);
      fetchTodoLists();
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Error adding todo");
      setTodoLists(intialTodoLists);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    let intialTodoLists: Todo[] = todoLists;
    try {
      setTodoLists((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      await axios.put(`${API_URL}/todos/${updatedTodo.id}`, updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Error updating status");
      setTodoLists(intialTodoLists);
    }
  };

  const deleteTodo = async (todoId: string) => {
    let intialTodoLists: Todo[] = todoLists;
    try {
      setTodoLists((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoId)
      );
      await axios.delete(`${API_URL}/todos/${todoId}`);
      fetchTodoLists();
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo");
      setTodoLists(intialTodoLists);
    }
  };

  useEffect(() => {
    updateSuccessPercentage();
    updateCompletedLists();
  }, [todoLists]);

  const contextValue: TodoContextType = {
    todoLists,
    successPercentage,
    completedLists,
    fetchTodoLists,
    filterTodoLists,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
