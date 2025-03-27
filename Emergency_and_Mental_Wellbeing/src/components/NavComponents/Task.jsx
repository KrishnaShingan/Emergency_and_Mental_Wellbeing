import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";


const API_URL = "http://localhost:8080/api/tasks";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("High");
    const [dueDate, setDueDate] = useState("");
    const [reminder, setReminder] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    useEffect(() => {
        if (email) loadTasks(email);
    }, [email]);

    const loadTasks = async (email) => {
        try {
            const response = await axios.get(`${API_URL}/${email}`);
            setTasks(response.data);
        } catch (error) {
            setError("Failed to fetch tasks.");
        }
    };

    const handleAddTask = async () => {
        if (!task || !dueDate) return;
        try {
            const newTask = {
                email,
                title: task,
                priority,
                dueDate: dayjs(dueDate).format("YYYY-MM-DDTHH:mm:ss"),
                reminder: reminder ? dayjs(reminder).format("YYYY-MM-DDTHH:mm:ss") : null,
            };
            await axios.post(API_URL, newTask);
            resetForm();
            loadTasks(email);
        } catch (error) {
            setError("Failed to add task.");
        }
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setTask(task.title);
        setPriority(task.priority);
        setDueDate(task.dueDate);
        setReminder(task.reminder);
    };

    const handleUpdateTask = async () => {
        if (!editTaskId || !task || !dueDate) return;
        try {
            const updatedTask = {
                email,
                title: task,
                priority,
                dueDate: dayjs(dueDate).format("YYYY-MM-DDTHH:mm:ss"),
                reminder: reminder ? dayjs(reminder).format("YYYY-MM-DDTHH:mm:ss") : null,
            };
            await axios.put(`${API_URL}/${editTaskId}`, updatedTask);
            resetForm();
            loadTasks(email);
        } catch (error) {
            setError("Failed to update task.");
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            loadTasks(email);
        } catch (error) {
            setError("Failed to delete task.");
        }
    };

    const resetForm = () => {
        setTask("");
        setPriority("High");
        setDueDate("");
        setReminder("");
        setEditTaskId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
                    Task Manager
                </h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Enter task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="w-full sm:flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full sm:w-32 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full sm:w-40 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="datetime-local"
                            value={reminder}
                            onChange={(e) => setReminder(e.target.value)}
                            className="w-full sm:w-48 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {editTaskId ? (
                            <>
                                <button
                                    onClick={handleUpdateTask}
                                    className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleAddTask}
                                className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
                            >
                                Add Task
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h2>
                            <p
                                className={`font-medium ${
                                    task.priority === "High"
                                        ? "text-red-500"
                                        : task.priority === "Medium"
                                        ? "text-yellow-500"
                                        : "text-green-500"
                                }`}
                            >
                                {task.priority} Priority
                            </p>
                            <p className="text-gray-600 text-sm">Due: {task.dueDate}</p>
                            <p className="text-gray-600 text-sm">Reminder: {task.reminder || "Not set"}</p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleEditTask(task)}
                                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Task;