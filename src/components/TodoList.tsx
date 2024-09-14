import React from "react";
import { useTasks } from "../hooks/useTasks";

function TodoList() {
  const {
    tasks,
    newTask,
    editingTask,
    addTask,
    deleteTask,
    moveTaskUp,
    moveTaskDown,
    completeTask,
    editTask,
    cancelEdit,
    setNewTask,
    setEditingTask,
  } = useTasks();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleEditInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditingTask({ ...editingTask, value: event.target.value });
  }

  return (
    <div className="mt-24 text-center px-4">
      <h1 className="text-2xl font-bold mb-6">Todo list</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          className="border-2 border-blue-400 focus:outline-blue-400 rounded-sm px-2 py-1 text-lg"
        />
        <button
          onClick={addTask}
          className="bg-blue-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      <ol className="list-none p-0">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center bg-gray-100 mb-2 px-4 py-3 rounded-md border border-gray-300"
          >
            {editingTask.index === index ? (
              <>
                <input
                  type="text"
                  value={editingTask.value}
                  onChange={handleEditInputChange}
                  className="flex-1 border-2 border-teal-500 focus:outline-teal-500 rounded-sm px-2 py-1"
                />
                <button
                  onClick={() => editTask(index)}
                  className="bg-teal-500 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-teal-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(index)}
                  className="mr-2"
                />
                <span
                  className={`flex-1 text-start ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => editTask(index, task)}
                  className="bg-yellow-400 font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => moveTaskUp(index)}
                  className="text-lg font-bold rounded-sm px-2 py-1 ml-2"
                >
                  ⬆️
                </button>
                <button
                  onClick={() => moveTaskDown(index)}
                  className="text-lg font-bold rounded-sm px-2 py-1 ml-2"
                >
                  ⬇️
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
