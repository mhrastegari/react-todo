import { Todo } from "./Todo";
import { TaskSort } from "../types";
import { NewTaskInput } from "./NewTaskInput";
import {
  useTasks,
  useEditTask,
  useSortBy,
  useSetSortBy,
  useDragTask,
  useNewTask,
  useTaskActions,
} from "../hooks";

function TodoList() {
  const tasks = useTasks();
  const sortBy = useSortBy();
  const setSortBy = useSetSortBy();
  const { editTask } = useEditTask();
  const { dragStart, dragOver, drop } = useDragTask();
  const { newTask, setNewTask, addTask } = useNewTask();
  const { deleteTask, moveTaskUp, moveTaskDown, toggleTask } = useTaskActions();

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl text-center font-bold my-4">Todo list</h1>
      <NewTaskInput
        addTask={addTask}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <div className="mb-4">
        <label htmlFor="sort-by" className="me-2">
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(parseInt(e.target.value))}
        >
          <option value={TaskSort.None}>None</option>
          <option value={TaskSort.Alphabetical}>Alphabetical</option>
          <option value={TaskSort.Date}>Date</option>
        </select>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        <ol className="list-none flex-1 overflow-y-auto">
          {tasks.map((task) => (
            <li
              key={task.id}
              draggable={sortBy === TaskSort.None}
              onDragStart={() => dragStart(task.index)}
              onDragOver={dragOver}
              onDrop={() => drop(task.index)}
            >
              <Todo
                task={task}
                onEdit={(text) => editTask(task.id, text)}
                onDelete={() => deleteTask(task.id)}
                onMoveUp={() => moveTaskUp(task.index)}
                onMoveDown={() => moveTaskDown(task.index)}
                onCompleteToggle={() => toggleTask(task.id)}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default TodoList;
