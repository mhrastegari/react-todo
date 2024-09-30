import {
  useEditTask,
  useSortBy,
  useSetSortBy,
  useFilter,
  useSetFilter,
  useDragTask,
  useNewTask,
  useTaskActions,
  useDisplayedTasks,
} from "../hooks";
import { Todo } from "./Todo";
import { NewTaskInput } from "./NewTaskInput";
import { TaskSort, TaskSorts, TaskFilter, TaskFilters } from "../types";

function TodoList() {
  const tasks = useDisplayedTasks();
  const sortBy = useSortBy();
  const setSortBy = useSetSortBy();
  const filter = useFilter();
  const setFilter = useSetFilter();
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
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="sort-by" className="me-2">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as TaskSort)}
          >
            {TaskSorts.map((sort) => (
              <option key={sort} value={sort}>
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter" className="me-2">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as TaskFilter)}
          >
            {TaskFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        <ol className="list-none flex-1 overflow-y-auto">
          {tasks.map((task) => (
            <li
              key={task.id}
              draggable={sortBy === "none"}
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
