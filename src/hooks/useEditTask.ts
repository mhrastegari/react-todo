import { Task } from "../types";
import { useTasks, useSetTasks } from "../hooks";

export function useEditTask() {
  const tasks = useTasks();
  const setTasks = useSetTasks();

  function editTask(id: string, updatedText: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: updatedText } : task
    );
    setTasks(updatedTasks);
  }

  return { editTask };
}
