import { useState, useEffect } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<{ index: number | null; value: string }>({ index: null, value: '' });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  }

  function deleteTask(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function completeTask(index: number) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function editTask(index: number, task: Task | null = null) {
    if (task !== null) {
      setEditingTask({ index, value: task.text });
    } else if (editingTask.value.trim() !== '') {
      const updatedTasks = tasks.map((t, i) =>
        i === editingTask.index ? { ...t, text: editingTask.value } : t
      );
      setTasks(updatedTasks);
      setEditingTask({ index: null, value: '' });
    }
  }

  function cancelEdit() {
    setEditingTask({ index: null, value: '' });
  }

  return {
    tasks,
    newTask,
    editingTask,
    addTask,
    deleteTask,
    moveTaskUp,
    moveTaskDown,
    completeTask,
    editTask,
    cancelEdit,
    setNewTask,
    setEditingTask
  };
}
