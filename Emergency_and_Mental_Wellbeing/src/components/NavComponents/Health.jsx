import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

const Health = ({ username }) => {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) fetchHistory();
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

  const handleChange = (index, value) => setResponses({ ...responses, [index]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(responses).length !== questions.length) {
      setError("Please answer all questions.");
      return;
    }
    setError("");
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const formattedResponses = Object.values(responses).map(Number);
    try {
      const response = await axios.post(
        `${API_URL}/api/assessment`,
        { username, responses: formattedResponses },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      setScore(response.data.score);
      setStep(4);
      fetchHistory();
      clearForm();
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/assessment/history?username=${username}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/api/assessment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHistory();
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  const clearForm = () => {
    setResponses({});
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {step === 1 && (
          <>
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Mental Wellbeing Assessment
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
              >
                Start Assessment
              </button>
              <button
                onClick={() => { fetchHistory(); setStep(5); }}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200"
              >
                View History
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-medium text-gray-700 text-center mb-4">
              Your Data is Safe
            </h2>
            <p className="text-gray-600 text-center mb-6">Your answers are confidential.</p>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Take Test Now
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-medium text-gray-700 mb-6">Mental Health Questionnaire</h2>
            {questions.map((question, index) => (
              <div key={index} className="mb-6">
                <p className="text-gray-800 font-medium mb-2">{question}</p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleChange(index, value)}
                      className={`px-4 py-2 rounded-md shadow-sm ${
                        responses[index] === value
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Submit
            </button>
          </>
        )}

        {step === 4 && score !== null && (
          <>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Test Results</h2>
            <p className="text-lg text-gray-600">Your total score: <span className="font-semibold">{score}</span></p>
            <p className="text-red-500 font-medium mt-2">Depression Level: {getDepressionLevel(score)}</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setStep(3)}
                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
              >
                Reassess
              </button>
              <button
                onClick={() => setStep(5)}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200"
              >
                View History
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-2xl font-medium text-gray-700 mb-6">Test History</h2>
            {history.length === 0 ? (
              <p className="text-gray-600 text-center">No previous tests found.</p>
            ) : (
              history.map((entry, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">Date: {new Date(entry.timestamp).toLocaleString()}</p>
                    <p className="font-medium">Score: {entry.score}</p>
                    <p className="text-red-500 font-medium">Level: {getDepressionLevel(entry.score)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id || entry._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200 mt-4"
            >
              Back to Assessment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Health;