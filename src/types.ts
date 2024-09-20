import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: string;
  text: string;
  index: number;
  createdAt: Date;
  completed: boolean;
}

export enum TaskSort {
  None,
  Alphabetical,
  Date
}

export interface TaskContext {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  sortBy: number;
  setSortBy: Dispatch<SetStateAction<number>>;
}
