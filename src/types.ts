import { Dispatch, SetStateAction } from "react";

export const TaskSorts = ["none", "alphabetical", "date"] as const;
export type TaskSort = (typeof TaskSorts)[number];

export const TaskFilters = ["all", "done", "active"] as const;
export type TaskFilter = (typeof TaskFilters)[number];

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
  filter: TaskFilter;
  setFilter: Dispatch<SetStateAction<TaskFilter>>;
  displayedTasks: Task[];
}
