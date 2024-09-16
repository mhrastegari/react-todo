import { Task } from "../types";

export function useEditTask(setTasks: (tasks: Task[]) => void, tasks: Task[]) {
  function editTask(index: number, updatedText: string) {
    const updatedTasks = tasks.map((task) =>
      task.index === index ? { ...task, text: updatedText } : task
    );
    setTasks(updatedTasks);
  }

  return { editTask };
}
