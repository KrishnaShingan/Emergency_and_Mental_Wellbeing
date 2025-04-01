import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-teal-700 mb-4 animate-fade-in">
          Welcome to Your Wellbeing Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A sanctuary for your mental health and a lifeline in emergencies—support is just a click away.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/health")}
            className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-700 transition duration-300"
          >
            Check Your Wellbeing
          </button>
          <button
            onClick={() => navigate("/help")}
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition duration-300"
          >
            Emergency SOS
          </button>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
        <FeatureCard
          title="Mood Tracker"
          description="Log your emotions daily and see your journey."
          icon="🧘"
          path="/mood"
          bgColor="bg-teal-100"
        />
        <FeatureCard
          title="AI Chat Support"
          description="Talk to our 24/7 virtual assistant."
          icon="🤖"
          path="/support"
          bgColor="bg-blue-100"
        />
        <FeatureCard
          title="Video Resources"
          description="Watch calming and inspiring content."
          icon="🎥"
          path="/video"
          bgColor="bg-green-100"
        />
        <FeatureCard
          title="Task Manager"
          description="Stay organized with ease."
          icon="📋"
          path="/tasks"
          bgColor="bg-yellow-100"
        />
      </section>

      {/* Call to Action */}
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Mental Health Matters
        </h2>
        <p className="text-gray-600 mb-6">
          Explore tools designed to uplift your spirit and keep you prepared for any moment.
        </p>
        <button
          onClick={() => navigate("/project-details")}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
        >
          Learn More About Us
        </button>
      </section>

    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ title, description, icon, path, bgColor }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className={`${bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;