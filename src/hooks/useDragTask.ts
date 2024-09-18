import { DragEvent, useState } from "react";
import { useSetTasks, useTasks } from "./useTaskState";

export function useDragTask() {
  const tasks = useTasks();
  const setTasks = useSetTasks();
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null);

  function dragStart(index: number) {
    setDraggedTaskIndex(index);
  }

  function dragOver(event: DragEvent<HTMLLIElement>) {
    event.preventDefault();
  }

  function drop(index: number) {
    if (draggedTaskIndex !== null) {
      const updatedTasks = [...tasks];
      const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
      updatedTasks.splice(index, 0, draggedTask);

      updatedTasks.forEach((task, i) => (task.index = i));
      setTasks(updatedTasks);
    }
    setDraggedTaskIndex(null);
  }

  return { dragStart, dragOver, drop };
}
