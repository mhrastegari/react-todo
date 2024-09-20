import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { Task, TaskSort, TaskContext } from "../types";

const TaskStateContext = createContext<TaskContext>(null!);

export function useTasks() {
  return useContext(TaskStateContext).tasks;
}

export function useSetTasks() {
  return useContext(TaskStateContext).setTasks;
}

export function useSortBy() {
  return useContext(TaskStateContext).sortBy;
}

export function useSetSortBy() {
  return useContext(TaskStateContext).setSortBy;
}

export function TaskProvider(props: PropsWithChildren<{}>) {
  const [tasks, setTasks] = useState<Array<Task>>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [sortBy, setSortBy] = useState<number>(TaskSort.None);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  useEffect(() => {
    const sortedTasks = [...tasks];
  
    if (sortBy === TaskSort.Alphabetical) {
      sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortBy === TaskSort.Date) {
      sortedTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  
    if (JSON.stringify(sortedTasks) !== JSON.stringify(tasks)) {
      setTasks(sortedTasks);
    }
  }, [sortBy, tasks]);  

  return (
    <TaskStateContext.Provider value={{ tasks, setTasks, sortBy, setSortBy }}>
      {props.children}
    </TaskStateContext.Provider>
  );
}
