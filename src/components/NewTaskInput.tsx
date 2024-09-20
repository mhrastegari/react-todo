import { useRef, useEffect } from "react";

interface Props {
  addTask: () => void;
  newTask: string;
  setNewTask: (value: string) => void;
}

export function NewTaskInput(props: Props) {
  const newTaskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTaskInputRef.current) {
      newTaskInputRef.current.focus();
    }
  }, [props.newTask]);

  return (
    <div className="flex items-center justify-center mb-4 mt-2">
      <input
        type="text"
        placeholder="Enter a task..."
        value={props.newTask}
        onChange={(e) => props.setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.addTask();
          }
        }}
        ref={newTaskInputRef}
        className="border-2 border-blue-400 focus:outline-blue-400 rounded-sm px-2 text-lg max-sm:flex-1"
      />
      <button
        onClick={props.addTask}
        className="bg-blue-400 text-white font-bold rounded-sm px-3 py-1 ml-2 transition duration-300 hover:bg-blue-500"
      >
        Add
      </button>
    </div>
  );
}
