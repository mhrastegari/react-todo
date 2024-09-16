import { Task } from "../types";

export function useEditTask(setTasks: (tasks: Task[]) => void, tasks: Task[]) {
  function editTask(id: string, updatedText: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: updatedText } : task
    );
    setTasks(updatedTasks);
  }

  return { editTask };
}
