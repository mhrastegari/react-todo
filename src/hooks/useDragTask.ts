import { DragEvent, useState } from "react";
import { useTasks, useSetTasks, useDisplayedTasks } from "./useTaskState";

export function useDragTask() {
  const tasks = useTasks();
  const setTasks = useSetTasks();
  const displayedTasks = useDisplayedTasks();
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null);

  function dragStart(index: number) {
    setDraggedTaskIndex(index);
  }

  function dragOver(event: DragEvent<HTMLLIElement>) {
    event.preventDefault();
  }

  function drop(index: number) {
    if (draggedTaskIndex === null) return;

    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);

    const targetIndex = tasks.findIndex(task => task.id === displayedTasks[index].id);

    updatedTasks.splice(targetIndex, 0, draggedTask);
    updatedTasks.forEach((task, i) => (task.index = i));
    
    setTasks(updatedTasks);
    setDraggedTaskIndex(null);
  }

  return { dragStart, dragOver, drop };
}
