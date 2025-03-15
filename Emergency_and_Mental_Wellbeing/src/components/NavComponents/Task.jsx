import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, deleteTask, updateTask } from "../../api";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("High");
    const [dueDate, setDueDate] = useState("");
    const [reminder, setReminder] = useState("");
    const [error, setError] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);

    // Retrieve logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;

    useEffect(() => {
        if (username) {
            loadTasks(username);
        } else {
            setError("User not logged in.");
            console.error("❌ No username found in localStorage!");
        }
    }, [username]);

    const loadTasks = async (username) => {
        try {
            const data = await fetchTasks(username);
            setTasks(data);
        } catch (error) {
            setError("Failed to fetch tasks. Please check the backend server.");
        }
    };

    const handleAddTask = async () => {
        if (!task || !dueDate) return;
        try {
            await addTask(username, { title: task, priority, dueDate, reminder });
            resetForm();
            loadTasks(username);
        } catch (error) {
            setError("Failed to add task. Please try again.");
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
            await updateTask(username, editTaskId, { title: task, priority, dueDate, reminder });
            resetForm();
            loadTasks(username);
        } catch (error) {
            setError("Failed to update task.");
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(username, id);
            loadTasks(username);
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
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen text-white">
            <h1 className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg">Task Manager</h1>
            {error && <p className="text-red-200 text-center font-semibold">{error}</p>}
            <div className="flex flex-wrap gap-4 mb-6 bg-white p-6 rounded-lg shadow-xl items-center">
                <input type="text" placeholder="Enter task" value={task} onChange={(e) => setTask(e.target.value)} className="border p-3 w-full md:w-1/3 text-black rounded-lg focus:ring-2 focus:ring-indigo-400" />
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-3 text-black rounded-lg focus:ring-2 focus:ring-indigo-400">
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-3 text-black rounded-lg focus:ring-2 focus:ring-indigo-400" />
                <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} className="border p-3 text-black rounded-lg focus:ring-2 focus:ring-indigo-400" />
                {editTaskId ? (
                    <button onClick={handleUpdateTask} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200">Update Task</button>
                ) : (
                    <button onClick={handleAddTask} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200">Add Task</button>
                )}
                {editTaskId && <button onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200">Cancel</button>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                    <div key={task.id} className="p-6 bg-white text-black shadow-xl rounded-xl transform transition duration-200 hover:scale-105">
                        <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
                        <p className={`text-lg font-semibold ${task.priority === "High" ? "text-red-600" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{task.priority} Priority</p>
                        <p className="text-gray-600 text-sm">Due: {task.dueDate}</p>
                        <p className="text-gray-600 text-sm">Reminder: {task.reminder}</p>
                        <div className="flex gap-4 mt-4">
                            <button onClick={() => handleEditTask(task)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200">Edit</button>
                            <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;
