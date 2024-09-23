import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: string;
  text: string;
  index: number;
  createdAt: Date;
  completed: boolean;
}

export interface TaskContext {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  sortBy: TaskSort;
  setSortBy: Dispatch<SetStateAction<TaskSort>>;
}

export const TaskSorts = ["none", "alphabetical", "date"] as const;
export type TaskSort = (typeof TaskSorts)[number];
