import React from "react";

const ProjectDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Project Details
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Welcome! This page explains all the features and how to use them easily.
        </p>

        <div className="space-y-6">
          <FeatureCard
            title="Task Manager"
            description="Create tasks, set reminders, and get email notifications."
            steps={[
              "Go to Task Manager.",
              "Click 'Add Task' and enter details.",
              "Set a reminder to receive an email."
            ]}
          />
          <FeatureCard
            title="Navigation Bar"
            description="A responsive hamburger menu for easy navigation."
            steps={[
              "Click the ☰ icon on smaller screens.",
              "Select Profile, Features, or Logout."
            ]}
          />
          <FeatureCard
            title="News Section"
            description="Save articles with a green 'Saved' button."
            steps={[
              "Go to News.",
              "Click 'Save' on an article.",
              "Button turns green when saved."
            ]}
          />
          <FeatureCard
            title="User Registration"
            description="Secure registration with a security question."
            steps={[
              "Answer a security question during signup.",
              "Use it to reset your password if needed."
            ]}
          />
          <FeatureCard
            title="Video Recommendations"
            description="Personalized mental health videos from YouTube."
            steps={[
              "Visit Video Section.",
              "Browse and watch recommended videos."
            ]}
          />
          <FeatureCard
            title="API Enhancements"
            description="Improved security and performance."
            steps={[
              "Uses deployed backend URL.",
              "CORS and API keys configured securely."
            ]}
          />
        </div>

        <p className="text-gray-600 text-center mt-10">
          This project is simple, fast, and user-friendly. Refer here for help!
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, steps }) => (
  <div className="bg-gray-100 p-4 rounded-md shadow-sm">
    <h2 className="text-xl font-medium text-gray-700 mb-2">{title}</h2>
    <p className="text-gray-600 mb-2">{description}</p>
    <ul className="list-disc list-inside text-gray-600">
      {steps.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ul>
  </div>
);

export default ProjectDetails;