import { Todo } from "./Todo";
import { NewTaskInput } from "./NewTaskInput";
import { useEditTask, useNewTask, useTaskActions, useTasks } from "../hooks";

function TodoList() {
  const tasks = useTasks();
  const { editTask } = useEditTask();
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
      <ol className="list-none flex-1 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <Todo
                task={task}
                onEdit={(text) => editTask(task.id, text)}
                onDelete={() => deleteTask(task.id)}
                onMoveUp={() => moveTaskUp(task.index)}
                onMoveDown={() => moveTaskDown(task.index)}
                onCompleteToggle={() => toggleTask(task.id)}
              />
            </li>
          ))
        )}
      </ol>
    </div>
  );
}

export default TodoList;
