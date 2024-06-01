import React, { useState, useEffect } from 'react';
import './todoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (inputValue.trim() === '') {
            alert('Task cannot be empty');
            return;
        }
        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    const removeTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'incomplete') {
            return !task.completed;
        }
        return true;
    });

    return (
        <div className="container">
            <h1 className="title">To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task"
                    className="task-input"
                />
                <button onClick={addTask} className="add-button">Add Task</button>
            </div>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
                <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}>Incomplete</button>
            </div>
            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
                        <button onClick={() => removeTask(task.id)} className="remove-button">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
