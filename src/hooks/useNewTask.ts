import { useState } from "react";
import { useTasks, useSetTasks } from "../hooks";

export function useNewTask() {
  const tasks = useTasks();
  const setTasks = useSetTasks();
  const [newTask, setNewTask] = useState<string>("");

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {
        id: crypto.randomUUID(),
        text: newTask,
        index: tasks.length,
        completed: false
      }]);
      setNewTask('');
    }
  }

  return { newTask, setNewTask, addTask };
}
