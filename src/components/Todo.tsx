import { Task } from "../types";
import { useState, useEffect, useRef } from "react";

interface Props {
  task: Task;
  onEdit: (text: string) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onCompleteToggle: (complete: boolean) => void;
}

export function Todo(props: Props) {
  const [status, setStatus] = useState<"view" | "edit">("view");
  const [editText, setEditText] = useState<string>(props.task.text);

  const editingTaskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTaskInputRef.current && status === "edit") {
      editingTaskInputRef.current.focus();
    }
  }, [status]);

  useEffect(() => {
    if (status === "view") {
      setEditText(props.task.text);
    }
  }, [props.task.text, status]);

  return (
    <>
      <input
        type="checkbox"
        checked={props.task.completed}
        onChange={(ev) => {
          props.onCompleteToggle(ev.target.checked);
        }}
      />
      <input
        value={editText}
        onChange={(ev) => {
          setEditText(ev.target.value);
          props.onEdit(ev.target.value);
        }}
        disabled={status !== "edit"}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setStatus("view");
            props.onEdit(editText);
          }
        }}
        ref={editingTaskInputRef}
        className={`flex-1 w-full border-2 border-teal-500 focus:outline-teal-500 rounded-sm px-2 py-1 disabled:border-transparent ${
          props.task.completed ? "line-through" : ""
        }`}
      />
      {status === "edit" ? (
        <button
          onClick={() => {
            setStatus("view");
            props.onEdit(editText);
          }}
          className="bg-teal-500 text-white font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-teal-600"
        >
          Done
        </button>
      ) : null}
      {status === "view" ? (
        <>
          <button
            onClick={() => {
              setStatus("edit");
            }}
            className="bg-yellow-400 font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={() => props.onDelete(props.task.index)}
            className="bg-red-400 text-white font-bold rounded-sm px-3 py-1 transition duration-300 hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => props.onMoveUp(props.task.index)}
            className="text-lg font-bold rounded-sm px-2 py-1"
          >
            ⬆️
          </button>
          <button
            onClick={() => props.onMoveDown(props.task.index)}
            className="text-lg font-bold rounded-sm px-2 py-1"
          >
            ⬇️
          </button>
        </>
      ) : null}
    </>
  );
}
