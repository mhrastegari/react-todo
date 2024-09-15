import { useState } from "react";
import { Task } from "../types";

export function useEditTask(setTasks: (tasks: Task[]) => void, tasks: Task[]) {
  const [editingTask, setEditingTask] = useState<{
    index: number | null;
    value: string;
  }>({
    index: null,
    value: "",
  });

  function editTask(index: number, task: Task | null = null) {
    if (task) {
      setEditingTask({ index, value: task.text });
    } else if (editingTask.value.trim() !== "" && editingTask.index !== null) {
      const updatedTasks = tasks.map((t) =>
        t.index === editingTask.index ? { ...t, text: editingTask.value } : t
      );
      setTasks(updatedTasks);
      setEditingTask({ index: null, value: "" });
    }
  }

  function cancelEdit() {
    setEditingTask({ index: null, value: "" });
  }

  return { editingTask, setEditingTask, editTask, cancelEdit };
}
