import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: string;
  text: string;
  index: number;
  completed: boolean;
}

export interface TaskContext {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}
