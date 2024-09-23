import {
  useMemo,
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
    return savedTasks
      ? JSON.parse(savedTasks).map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }))
      : [];
  });

  const [sortBy, setSortBy] = useState<TaskSort>("none");

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    switch (sortBy) {
      case "alphabetical":
        return tasks.toSorted((a, b) => a.text.localeCompare(b.text));
      case "date":
        return tasks.toSorted(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return tasks;
    }
  }, [tasks, sortBy]);

  return (
    <TaskStateContext.Provider
      value={{ tasks: sortedTasks, setTasks, sortBy, setSortBy }}
    >
      {props.children}
    </TaskStateContext.Provider>
  );
}
