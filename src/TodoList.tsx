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
  <div className="mt-24 text-center px-4">
    <h1 className="text-2xl font-bold mb-6">Todo list</h1>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
        className="border-2 border-blue-400 focus:outline-blue-400 rounded-sm px-2 py-1 text-lg" />
      <button onClick={addTask} className="bg-blue-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-blue-500">
        Add
      </button>
    </div>
  
    <ol className="list-none p-0">
      {tasks.map((task, index) => (
        <li key={index} className="flex items-center bg-gray-100 mb-2 px-4 py-3 rounded-md border border-gray-300">
          {editingTask.index === index ? (
            <>
              <input
                type="text"
                value={editingTask.value}
                onChange={handleEditInputChange}
                className="flex-1 border-2 border-teal-500 focus:outline-teal-500 rounded-sm px-2 py-1" />
              <button onClick={() => editTask(index)} className="bg-teal-500 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-teal-600">
                Save
              </button>
              <button onClick={cancelEdit} className="bg-gray-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-gray-500">
                Cancel
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(index)}
                className="mr-2" />
              <span className={`flex-1 text-start ${task.completed ? "line-through" : ""}`}>
                {task.text}
              </span>
              <button onClick={() => editTask(index, task)} className="bg-yellow-400 font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-yellow-500">
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="bg-red-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-red-500">
                Delete
              </button>
              <button onClick={() => moveTaskUp(index)} className="text-lg font-bold rounded-sm px-2 py-1 ml-2">
                ⬆️
              </button>
              <button onClick={() => moveTaskDown(index)} className="text-lg font-bold rounded-sm px-2 py-1 ml-2">
                ⬇️
              </button>
            </>
          )}
        </li>
      ))}
    </ol>
  </div>
  
  );
};

export default TodoList;
