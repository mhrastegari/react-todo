import { Task } from "../types";
import { useSortBy } from "../hooks";
import { useState, useEffect, useRef } from "react";

type TodoInputState = "view" | "edit";

interface Props {
  task: Task;
  onEdit: (text: string) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onCompleteToggle: (complete: boolean) => void;
}

export function Todo(props: Props) {
  const sortBy = useSortBy();
  const [status, setStatus] = useState<TodoInputState>("view");
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
    <div className="flex center flex-wrap gap-2 items-center bg-gray-100 mb-2 px-4 py-3 rounded-md border border-gray-300">
      <div className="flex flex-1 items-center w-full">
        {status === "view" ? (
          <input
            type="checkbox"
            checked={props.task.completed}
            onChange={(e) => {
              props.onCompleteToggle(e.target.checked);
            }}
          />
        ) : null}
        <input
          value={editText}
          ref={editingTaskInputRef}
          disabled={status === "view"}
          onChange={(e) => {
            setEditText(e.target.value);
            props.onEdit(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setStatus("view");
              props.onEdit(editText);
            }
          }}
          className={`flex-1 border-2 border-teal-500 focus:outline-teal-500 rounded-sm px-2 py-1 disabled:bg-transparent disabled:border-transparent ${
            props.task.completed && status === "view" ? "line-through" : ""
          }`}
        />
      </div>
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
      ) : (
        <>
          <span className="text-gray-500">
            {props.task.createdAt.toDateString()}
          </span>
          <div className="flex gap-2 items-center">
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
            {sortBy === "none" ? (
              <>
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
          </div>
        </>
      )}
    </div>
  );
}
