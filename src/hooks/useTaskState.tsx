import {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { Task } from "../types";

const TaskContext = createContext<
  [Array<Task>, Dispatch<SetStateAction<Array<Task>>>]
>(null!);

export function useTasks() {
  return useContext(TaskContext)[0];
}

export function useSetTasks() {
  return useContext(TaskContext)[1];
}

export function TaskProvider(props: PropsWithChildren<{}>) {
  const [tasks, setTasks] = useState<Array<Task>>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  return (
    <TaskContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TaskContext.Provider>
  );
}
