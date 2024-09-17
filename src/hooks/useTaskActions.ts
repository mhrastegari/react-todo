import { useTasks, useSetTasks } from "../hooks";

export function useTaskActions() {
  const tasks = useTasks();
  const setTasks = useSetTasks();

  function deleteTask(id: string) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    updatedTasks.forEach((task, i) => task.index = i);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const currentTask = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index - 1];
      updatedTasks[index - 1] = currentTask;
      updatedTasks.forEach((task, i) => task.index = i);
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const currentTask = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index + 1];
      updatedTasks[index + 1] = currentTask;
      updatedTasks.forEach((task, i) => task.index = i);
      setTasks(updatedTasks);
    }
  }

  function toggleTask(id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return { deleteTask, moveTaskUp, moveTaskDown, toggleTask };
}
