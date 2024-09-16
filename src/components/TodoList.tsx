import { Todo } from "./Todo";
import { NewTaskInput } from "./NewTaskInput";
import { useNewTask } from "../hooks/useNewTask";
import { useEditTask } from "../hooks/useEditTask";
import { useTaskState } from "../hooks/useTaskState";
import { useTaskActions } from "../hooks/useTaskActions";

function TodoList() {
  const { tasks, setTasks } = useTaskState();
  const { editTask } = useEditTask(setTasks, tasks);
  const { newTask, setNewTask, addTask } = useNewTask(setTasks, tasks);
  const { deleteTask, moveTaskUp, moveTaskDown, toggleTask } = useTaskActions(
    setTasks,
    tasks
  );

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold mb-6">Todo list</h1>
        <NewTaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      </div>
      <ol className="list-none flex-1 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="flex center flex-wrap gap-2 items-center bg-gray-100 mb-2 px-4 py-3 rounded-md border border-gray-300"
            >
              <Todo
                task={task}
                onEdit={(text) => editTask(task.index, text)}
                onDelete={() => deleteTask(task.index)}
                onMoveUp={() => moveTaskUp(task.index)}
                onMoveDown={() => moveTaskDown(task.index)}
                onCompleteToggle={() => toggleTask(task.index)}
              />
            </li>
          ))
        )}
      </ol>
    </div>
  );
}

export default TodoList;
