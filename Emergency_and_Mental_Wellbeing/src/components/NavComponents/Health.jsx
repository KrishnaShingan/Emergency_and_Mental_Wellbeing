import React, { useState, useEffect } from "react";
import { getAssessmentHistory, submitAssessment } from "../../api";
import axios from "axios";

const API_URL = "http://localhost:8080"; // ✅ Ensure API URL is set

const Health = ({ username }) => {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      fetchHistory();
    }
  }, [username]);

  const questions = [
    "Do you have any suicidal thoughts?",
    "Would you like to end your life?",
    "Do you have a plan for harming yourself?",
    "Do you often feel hopeless or empty?",
    "Do you struggle to find pleasure in activities you once enjoyed?",
    "Do you have difficulty concentrating or making decisions?",
    "Do you feel constantly tired or have low energy?",
    "Have you been experiencing changes in appetite or weight?",
    "Do you feel anxious or restless frequently?",
    "Do you have trouble sleeping or sleep too much?",
  ];

  const getDepressionLevel = (score) => {
    if (score > 30) return "Severe";
    if (score > 20) return "Moderate";
    return "Mild";
  };

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(responses).length !== questions.length) {
      setError("⚠️ Please answer all questions before submitting.");
      return;
    }
    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("❌ No auth token found! User may not be authenticated.");
      return;
    }

    const formattedResponses = Object.values(responses).map(Number);

    try {
      console.log("📤 Submitting assessment:", formattedResponses);
      const response = await axios.post(`${API_URL}/api/assessment`, {
        username,
        responses: formattedResponses,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Assessment submitted successfully:", response.data);
      setScore(response.data.score);
      setStep(4);
      fetchHistory();
    } catch (error) {
      console.error("❌ Error submitting assessment:", error.response?.data || error.message);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/assessment/history?username=${username}`);
      if (response.data.length === 0) {
        console.warn("⚠️ No history found!");
      } else {
        console.log("✅ Retrieved history:", response.data);
      }
      setHistory(response.data);
    } catch (error) {
      console.error("❌ Error fetching history:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("❌ No auth token found! User may not be logged in.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/assessment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ Assessment deleted successfully");
      fetchHistory();
    } catch (error) {
      console.error("❌ Error deleting assessment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg text-center">
      {step === 1 && (
        <button
          className="mb-4 px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all"
          onClick={() => {
            fetchHistory();
            setStep(5);
          }}
        >
          📜 View History
        </button>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">🧠 Mental Well-being Assessment</h2>
          <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all" onClick={() => setStep(2)}>
            🚀 Start Your Assessment
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-700">🔒 Your Data is Safe</h2>
          <p className="mt-2 text-gray-600">Your answers are confidential.</p>
          <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all" onClick={() => setStep(3)}>
            📝 Take Test Now
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-800">📝 Mental Health Questionnaire</h2>
          {questions.map((question, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">{question}</p>
              <div className="flex gap-2 mt-2">
                {[0, 1, 2, 3, 4].map((value) => (
                  <button
                    key={value}
                    className={`px-4 py-2 rounded-md shadow-md ${responses[index] === value ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={() => handleChange(index, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {error && <p className="text-red-500 font-bold mt-2">{error}</p>}
          <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all" onClick={handleSubmit}>
            ✅ Submit
          </button>
        </div>
      )}

      {step === 4 && score !== null && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📊 Test Results</h2>
          <p className="mt-2 text-lg font-semibold">Your total score: {score}</p>
          <p className="text-red-500 font-bold text-lg">Depression Level: {getDepressionLevel(score)}</p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-all" onClick={() => setStep(3)}>
              🔄 Reassess
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all" onClick={() => setStep(5)}>
              📜 View History
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📜 Test History</h2>
          {history.length === 0 ? (
            <p className="mt-2 text-gray-600">No previous tests found.</p>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="mt-4 p-3 border rounded-md shadow-md flex justify-between items-center">
                <div>
                  <p className="text-gray-700">🗓 Date: {new Date(entry.timestamp).toLocaleString()}</p>
                  <p className="font-bold">Score: {entry.score}</p>
                  <p className="text-red-500 font-bold">Level: {getDepressionLevel(entry.score)}</p>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-700 transition-all" onClick={() => handleDelete(entry.id || entry._id)}>
                  🗑 Delete
                </button>
              </div>
            ))
          )}
          <button className="mt-6 px-6 py-3 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition-all" onClick={() => setStep(1)}>
            🔙 Back to Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default Health;
