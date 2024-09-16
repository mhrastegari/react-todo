import { Task } from "../types";

export function useTaskActions(setTasks: (tasks: Task[]) => void, tasks: Task[]) {
    function deleteTask(index: number) {
      setTasks(tasks.filter((task) => task.index !== index));
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
  
    function toggleTask(index: number) {
      const updatedTasks = tasks.map((task) =>
        task.index === index ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    }
  
    return { deleteTask, moveTaskUp, moveTaskDown, toggleTask };
  }
  