import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-blue-100 to-sky-400 min-h-screen flex flex-col items-center justify-center px-6 text-gray-800">
      <h1 className="text-5xl font-extrabold text-blue-600">Welcome to Wellbeing</h1>
      <p className="mt-4 text-lg text-center max-w-2xl">
        Your one-stop platform for mental health support and emergency assistance.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-100 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Landing;
