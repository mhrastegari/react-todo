import React from 'react';
import { useTaskState } from '../hooks/useTaskState';
import { useNewTask } from '../hooks/useNewTask';
import { useEditTask } from '../hooks/useEditTask';
import { useTaskActions } from '../hooks/useTaskActions';

function TodoList() {
  const { tasks, setTasks } = useTaskState();
  const { newTask, setNewTask, addTask } = useNewTask(setTasks, tasks);
  const { editingTask, setEditingTask, editTask, cancelEdit } = useEditTask(setTasks, tasks);
  const { deleteTask, moveTaskUp, moveTaskDown, completeTask } = useTaskActions(setTasks, tasks);

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold mb-6">Todo list</h1>
        <div>
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

      <ol className="list-none flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <li
            key={task.index}
            className="flex flex-wrap gap-2 items-center bg-gray-100 mb-2 px-4 py-3 rounded-md border border-gray-300"
          >
            {editingTask.index === task.index ? (
              <>
                <input
                  type="text"
                  value={editingTask.value}
                  onChange={(event) =>
                    setEditingTask({ ...editingTask, value: event.target.value })
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      editTask(task.index);
                    }
                  }}
                  className="flex-1 w-full border-2 border-teal-500 focus:outline-teal-500 rounded-sm px-2 py-1"
                />
                <button
                  onClick={() => editTask(task.index)}
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
                  onChange={() => completeTask(task.index)}
                />
                <span
                  className={`flex-1 min-w-64 text-start overflow-hidden text-ellipsis ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => editTask(task.index, task)}
                  className="bg-yellow-400 font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.index)}
                  className="bg-red-400 text-white font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => moveTaskUp(task.index)}
                  className="text-lg font-bold rounded-sm px-2 py-1"
                >
                  ⬆️
                </button>
                <button
                  onClick={() => moveTaskDown(task.index)}
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
