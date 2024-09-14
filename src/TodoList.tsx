
import React, { useState, useEffect, ChangeEvent } from "react";

interface Task {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<{ index: number | null; value: string }>({
    index: null,
    value: "",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleEditInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingTask({ ...editingTask, value: event.target.value });
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const moveTaskUp = (index: number) => {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
      setTasks(updatedTask);
    }
  };

  const moveTaskDown = (index: number) => {
    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
      setTasks(updatedTask);
    }
  };

  const completeTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index: number, task: Task | null = null) => {
    if (task !== null) {
      setEditingTask({ index, value: task.text });
    } else if (editingTask.value.trim() !== "") {
      const updatedTasks = tasks.map((t, i) =>
        i === editingTask.index ? { ...t, text: editingTask.value } : t
      );
      setTasks(updatedTasks);
      setEditingTask({ index: null, value: "" });
    }
  };

  const cancelEdit = () => {
    setEditingTask({ index: null, value: "" });
  };

  return (
    <div className="todo-list">
      <h1>Todo list</h1>
      <div>
        <input
          type="text"
          className="task-input"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange} />
        <button className="add-button" onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingTask.index === index ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={editingTask.value}
                  onChange={handleEditInputChange} />
                <button className="save-button" onClick={() => editTask(index)}>Save</button>
                <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(index)} />
                <span className={`text ${task.completed ? "completed" : ""}`}>
                  {task.text}
                </span>
                <button className="edit-button" onClick={() => editTask(index, task)}>Edit</button>
                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                <button className="move-button" onClick={() => moveTaskUp(index)}>⬆️</button>
                <button className="move-button" onClick={() => moveTaskDown(index)}>⬇️</button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
