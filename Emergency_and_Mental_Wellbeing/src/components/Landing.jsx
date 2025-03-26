import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-800">
      <h1 className="text-4xl font-semibold text-teal-700 mb-4">Welcome to Wellbeing</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Your one-stop platform for mental health support and emergency assistance.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Landing;