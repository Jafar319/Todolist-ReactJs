import React, { useState } from "react";

const TodoList = () => {
  // State for tasks and input value
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add a new task
  const addTask = () => {
    if (input.trim() === "") return; // Prevent adding empty tasks
    const newTask = {
      id: Date.now(), // Unique ID
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput(""); // Clear input field
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="btn btn-warning" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="list-group-item text-center">No tasks to show</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
