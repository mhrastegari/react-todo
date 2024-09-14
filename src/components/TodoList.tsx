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

  return (
    <div className="px-4">
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Todo list</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
            className="border-2 border-blue-400 focus:outline-blue-400 rounded-sm px-2 text-lg"
          />
          <button
            onClick={addTask}
            className="bg-blue-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>

      <ol className="list-none p-0 max-h-[408px] overflow-y-auto">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex flex-wrap gap-2 items-center bg-gray-100 mb-2 px-4 py-3 rounded-md border border-gray-300"
          >
            {editingTask.index === index ? (
              <>
                <input
                  type="text"
                  value={editingTask.value}
                  onChange={(event) =>
                    setEditingTask({ ...editingTask, value: event.target.value })
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      editTask(index);
                    }
                  }}
                  className="flex-1 w-full border-2 border-teal-500 focus:outline-teal-500 rounded-sm px-2 py-1"
                />
                <button
                  onClick={() => editTask(index)}
                  className="bg-teal-500 text-white font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-teal-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-gray-500"
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
                />
                <span
                  className={`flex-1 min-w-64 text-start overflow-hidden text-ellipsis ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => editTask(index, task)}
                  className="bg-yellow-400 font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-400 text-white font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => moveTaskUp(index)}
                  className="text-lg font-bold rounded-sm px-2 py-1"
                >
                  ⬆️
                </button>
                <button
                  onClick={() => moveTaskDown(index)}
                  className="text-lg font-bold rounded-sm px-2 py-1"
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
