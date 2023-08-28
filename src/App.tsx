import React from "react";
import "./App.css";
import TodoContent from "./components/TodoContent/TodoContent";
import { TodoProvider } from "./contexts/TodoContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <TodoContent />
        <Toaster />
      </TodoProvider>
    </div>
  );
}

export default App;
