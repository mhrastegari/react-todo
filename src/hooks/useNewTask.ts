import { useState } from 'react';
import { Task } from "../types";

export function useNewTask(setTasks: (tasks: Task[]) => void, tasks: Task[]) {
  const [newTask, setNewTask] = useState('');

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: crypto.randomUUID(), text: newTask, index: tasks.length, completed: false }]);
      setNewTask('');
    }
  }

  return { newTask, setNewTask, addTask };
}
