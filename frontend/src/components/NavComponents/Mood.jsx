import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Mood = () => {
  const [mood, setMood] = useState(5);
  const [description, setDescription] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [history, setHistory] = useState([]);
  const [entryId, setEntryId] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) fetchHistory();
  }, [username]);

  const fetchHistory = async () => {
    try {
      if (!username) return;
      const response = await axios.get(`http://localhost:8080/mood/history?username=${encodeURIComponent(username)}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleSubmit = async () => {
    if (!username) return;
    const moodEntry = { username, mood, description, sleep, water, date: new Date().toISOString().split("T")[0] };
    try {
      if (entryId) {
        await axios.put(`http://localhost:8080/mood/update/${entryId}`, moodEntry);
      } else {
        await axios.post("http://localhost:8080/mood/save", moodEntry);
      }
      fetchHistory();
      resetForm();
    } catch (error) {
      console.error("Error submitting mood:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/mood/delete/${id}`);
      fetchHistory();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const resetForm = () => {
    setMood(5);
    setDescription("");
    setSleep("");
    setWater("");
    setEntryId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-700 text-center mb-6">Mood Tracker</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Rate Your Mood</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-center text-gray-600 mt-2">
            Mood Score: {mood} {["😞", "😢", "😐", "🙂", "😃", "😆", "😁", "😂", "🤩", "😍"][mood - 1]}
          </p>
        </div>

        <textarea
          placeholder="Journal Entry"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
        />
        <input
          type="number"
          placeholder="Sleep Hours"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
        />
        <input
          type="number"
          placeholder="Water Intake (ml)"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
        >
          {entryId ? "Update Mood" : "Save Mood"}
        </button>

        <div className="mt-10">
          <h3 className="text-lg font-medium text-gray-600 text-center mb-4">Weekly Mood Report</h3>
          {history.length > 0 ? (
            <LineChart width={500} height={250} data={history} className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#0d9488" />
            </LineChart>
          ) : (
            <p className="text-gray-600 text-center">No mood records found.</p>
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-medium text-gray-600 text-center mb-4">Previous Reports</h3>
          {history.length === 0 ? (
            <p className="text-gray-600 text-center">No records found.</p>
          ) : (
            history.map((entry) => (
              <div key={entry.id} className="p-4 bg-gray-100 rounded-md shadow-sm mb-4">
                <p className="text-gray-700">Date: {entry.date}</p>
                <p className="text-gray-700">Mood Score: {entry.mood}</p>
                <p className="text-gray-700">Journal: {entry.description}</p>
                <p className="text-gray-700">Sleep: {entry.sleep} hrs</p>
                <p className="text-gray-700">Water: {entry.water} ml</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setMood(entry.mood);
                      setDescription(entry.description);
                      setSleep(entry.sleep);
                      setWater(entry.water);
                      setEntryId(entry.id);
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Mood;