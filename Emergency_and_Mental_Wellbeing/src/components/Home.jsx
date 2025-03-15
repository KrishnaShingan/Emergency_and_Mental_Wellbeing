import React from "react";
import "../index.css";

const Home = ({ onLogout }) => {
  return (
    <div className="bg-gradient-to-b from-sky-200 to-blue-300 w-full h-screen flex flex-col justify-center items-center p-6 text-center">
      {/* Title */}
      <h1 className="text-5xl font-bold text-blue-700 drop-shadow-lg">
        Your Safe Space
      </h1>

      {/* Motivational Quote */}
      <p className="mt-4 text-xl font-medium text-gray-800 italic">
        "Your mental health is just as important as your physical health. Take care of both."
      </p>

      {/* Platform Overview */}
      <div className="bg-white shadow-lg p-6 rounded-lg mt-6 w-3/4">
        <h2 className="text-2xl font-semibold text-blue-600">What We Offer</h2>
        <ul className="mt-4 text-gray-700 leading-relaxed text-lg">
          <li> <b>SOS Help System</b> – Get immediate assistance during emergencies</li>
          <li> <b>Mental Wellbeing Assessment</b> – Check your mental health regularly</li>
          <li> <b>Chatbot Support</b> – Talk to a virtual assistant anytime</li>
          <li> <b>Video Recommendations</b> – Helpful content to boost positivity</li>
          <li> <b>Mood Tracker</b> – Keep track of your emotional journey</li>
          <li> <b>News</b> – Get to know what is happening around the world</li>
          <li> <b>Task Manager</b> – Use it for storing your tasks</li>
        </ul>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="mt-6 px-8 py-3 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
