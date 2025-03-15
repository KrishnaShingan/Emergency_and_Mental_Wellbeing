import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Mood = () => {
  const [mood, setMood] = useState(5);
  const [description, setDescription] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [history, setHistory] = useState([]);
  const [entryId, setEntryId] = useState(null); // Store entry ID for updates
  const [error, setError] = useState("");
  const username = localStorage.getItem("username"); // Get logged-in user's name

  useEffect(() => {
    if (username) fetchHistory();
  }, [username]);

  // ✅ Fetch Mood History (Only for Logged-in User)
  const fetchHistory = async () => {
    try {
      const username = localStorage.getItem("username"); // ✅ Ensure username is available
      if (!username) {
        console.error("❌ Username is missing. Cannot fetch mood history.");
        return;
      }
      
      const response = await axios.get(`http://localhost:8080/mood/history?username=${encodeURIComponent(username)}`);
      setHistory(response.data);
    } catch (error) {
      console.error("❌ Error fetching history:", error.response?.data || error.message);
    }
  };
  

  // ✅ Handle Mood Entry Submission (Save or Update)
 // ✅ Handle Mood Entry Submission (Save or Update)
const handleSubmit = async () => {
  if (!username) {
    console.error("❌ Please log in to track your mood.");
    return;
  }

  const moodEntry = {
    username,
    mood,
    description,
    sleep,
    water,
    date: new Date().toISOString().split("T")[0],
  };

  try {
    if (entryId) {
      // ✅ Update existing mood entry
      await axios.put(`http://localhost:8080/mood/update/${entryId}`, moodEntry);
      console.log("✅ Mood entry updated!");
    } else {
      // ✅ Create a new mood entry
      await axios.post("http://localhost:8080/mood/save", moodEntry);
      console.log("✅ Mood saved!");
    }

    fetchHistory(); // Refresh data
  } catch (error) {
    console.error("❌ Error submitting mood:", error.response?.data || error.message);
  }
};

// ✅ Handle Mood Entry Deletion
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/mood/delete/${id}`);
    console.log("✅ Mood entry deleted!");
    fetchHistory(); // Refresh history
  } catch (error) {
    console.error("❌ Error deleting entry:", error.response?.data || error.message);
  }
};


  // ✅ Reset Form Fields
  const resetForm = () => {
    setMood(5);
    setDescription("");
    setSleep("");
    setWater("");
    setEntryId(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center">Mood Tracker</h2>

      {/* Mood Slider */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Rate Your Mood</h3>
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full"
        />
        <p className="text-center text-gray-600 mt-2">
          <strong>Mood Score:</strong> {mood} {["😞", "😢", "😐", "🙂", "😃", "😆", "😁", "😂", "🤩", "😍"][mood - 1]}
        </p>
      </div>

      {/* Journal & Health Inputs */}
      <textarea
        placeholder="Journal Entry"
        className="w-full mt-3 p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Sleep Hours"
        className="w-full mt-3 p-2 border rounded"
        value={sleep}
        onChange={(e) => setSleep(e.target.value)}
      />

      <input
        type="number"
        placeholder="Water Intake (ml)"
        className="w-full mt-3 p-2 border rounded"
        value={water}
        onChange={(e) => setWater(e.target.value)}
      />

      {/* Save / Update Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {entryId ? "Update Mood" : "Save Mood"}
      </button>

      {/* Weekly Mood Report */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-center">Weekly Mood Report</h3>
        {history.length > 0 ? (
          <LineChart width={500} height={250} data={history} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" />
          </LineChart>
        ) : (
          <p className="text-center text-gray-600">No mood records found.</p>
        )}
      </div>

      {/* Previous Reports */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-center">Previous Mood Reports</h3>
        {history.length === 0 ? (
          <p className="text-center text-gray-600">No records found.</p>
        ) : (
          history.map((entry) => (
            <div key={entry.id} className="p-4 border rounded mb-3">
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Mood Score:</strong> {entry.mood}</p>
              <p><strong>Journal Entry:</strong> {entry.description}</p>
              <p><strong>Sleep Hours:</strong> {entry.sleep}</p>
              <p><strong>Water Intake:</strong> {entry.water} ml</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setMood(entry.mood);
                    setDescription(entry.description);
                    setSleep(entry.sleep);
                    setWater(entry.water);
                    setEntryId(entry.id);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mood;
