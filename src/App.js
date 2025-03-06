"use client";

import { useEffect, useState} from "react";
import "./App.css";

export default function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState("all");

    // LocalStorage hai browser per data store krega.....

    useEffect(() => {
      const storedData = localStorage.getItem("todos");
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    }, []);
    
    useEffect(() => {
      if (todos.length > 0) {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    }, [todos]);
    

    // Add Task ke liye.....

    const handleAdd = (event) => {
        event.preventDefault();
        const input = newTodo.trim();
        if (todos.some((todo) => todo.text === input)) return alert("This task is existing");
        setTodos([...todos, { id: Date.now().toString(), text: input, completed: false }]);
        setNewTodo("");
    };


    // Completed Task  ke liye.....
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        );
    };

    // Delete Task .....
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // input type hit krne per bhi add hoga.....
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAdd(e);
        }
    };

//  filter hai all task ke liye aur completed task ke liye....
    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "completed") return todo.completed;
        return true;
    });


    return (
        <div className="main-div">
            <h1>Todo List</h1>
            <div>
                <input type="text" placeholder="Add a task..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={handleKeyDown} />
                <button className="add" onClick={handleAdd}>Add</button>
            </div>

            <div>
                <button onClick={() => setFilter("all")}>All Task</button>
                <button onClick={() => setFilter("completed")}>Completed Task</button>
            </div>

            <ul>
                {filteredTodos.length === 0 ? (
                    <p>{filter === "all" ? "No Task Added till now....." : "Not completed any tasks....."}</p>
                ) : (
                    filteredTodos.map((todo) => (
                        <li key={todo.id}>
                            <div className="check">
                                <input className="check-box" type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                                <span>{todo.text}</span>
                            </div>
                            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}


