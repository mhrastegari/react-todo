
import React, { useState, useEffect } from "react";

function TodoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState([]);
    const [editingTask, setEditingTask] = useState({ index: null, value: "" });
    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleEditInputChange(event) {
        setEditingTask({ ...editingTask, value: event.target.value });
    }
    
    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] = 
            [updatedTask[index - 1], updatedTask[index]]
            setTasks(updatedTask);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] = 
            [updatedTask[index + 1], updatedTask[index]]
            setTasks(updatedTask);
        }
    }

    function completeTask(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    function editTask(index, task = null) {
        if (task !== null) {
            setEditingTask({ index, value: task.text });
        } else if (editingTask.value.trim() !== "") {
            const updatedTasks = tasks.map((t, i) =>
                i === editingTask.index ? { ...t, text: editingTask.value } : t
            );
            setTasks(updatedTasks);
            setEditingTask({ index: null, value: "" });
        }
    }

    function cancelEdit() {
        setEditingTask({ index: null, value: "" });
    }

    return (
        <div className="todo-list">
            <h1>Todo list</h1>
            <div>
                <input 
                    type="text" 
                    className="task-input"
                    placeholder="Enter a task..." 
                    value={newTask} 
                    onChange={handleInputChange} />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editingTask.index === index ? (
                            <>
                                <input 
                                    type="text" 
                                    className="edit-input"
                                    value={editingTask.value} 
                                    onChange={handleEditInputChange} />
                                <button className="save-button" onClick={() => editTask(index)}>Save</button>
                                <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => completeTask(index)} />
                                <span className={`text ${task.completed ? "completed" : ""}`}>
                                    {task.text}
                                </span>
                                <button className="edit-button" onClick={() => editTask(index, task)}>Edit</button>
                                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>⬆️</button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>⬇️</button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}


export default TodoList;