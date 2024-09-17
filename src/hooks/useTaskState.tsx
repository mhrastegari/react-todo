import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { Task, TaskContext } from "../types";

const TaskStateContext = createContext<TaskContext>(null!);

export function useTasks() {
  return useContext(TaskStateContext).tasks;
}

export function useSetTasks() {
  return useContext(TaskStateContext).setTasks;
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
    <TaskStateContext.Provider value={{ tasks, setTasks }}>
      {props.children}
    </TaskStateContext.Provider>
  );
}
