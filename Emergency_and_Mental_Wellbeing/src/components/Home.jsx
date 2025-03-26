import React, { useState } from "react";

const Home = () => {
  const [mood, setMood] = useState(null);

  // Sample quotes (could be fetched from an API or expanded)
  const dailyQuotes = [
    { text: "You are enough just as you are.", author: "Megan Markle" },
    { text: "The best way out is always through.", author: "Robert Frost" },
    { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
  ];
  const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-teal-200 rounded-full opacity-20 animate-pulse-slow top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-72 h-72 bg-blue-200 rounded-full opacity-20 animate-pulse-slow bottom-0 right-0 translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* Hero Section */}
      <section className="text-center z-10 mb-12">
        <h1 className="text-5xl font-bold text-teal-700 mb-4 animate-fade-in">
          Your Mental Haven
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A space to breathe, reflect, and find strength—crafted for your peace and preparedness.
        </p>
      </section>

      {/* Daily Wellbeing Spotlight */}
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto text-center z-10">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Daily Spotlight</h2>

        {/* Inspirational Quote */}
        <div className="mb-8">
          <p className="text-xl text-gray-700 italic">"{randomQuote.text}"</p>
          <p className="text-sm text-gray-500 mt-2">— {randomQuote.author}</p>
        </div>

        {/* Quick Mood Check-In */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">How are you feeling today?</h3>
          <div className="flex justify-center gap-4">
            {[
              { emoji: "😊", label: "Happy" },
              { emoji: "😐", label: "Neutral" },
              { emoji: "😔", label: "Sad" },
            ].map(({ emoji, label }) => (
              <button
                key={label}
                onClick={() => handleMoodSelect(label)}
                className={`text-4xl p-4 rounded-full transition duration-300 ${
                  mood === label ? "bg-teal-100 shadow-md" : "hover:bg-gray-100"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          {mood && (
            <p className="mt-4 text-gray-600">
              You’re feeling {mood.toLowerCase()} today. Take a moment for yourself—explore our tools!
            </p>
          )}
        </div>
      </section>

      {/* Footer Note */}
      <p className="text-gray-500 text-sm mt-8 z-10">
        Navigate your journey using the menu above.
      </p>
    </div>
  );
};

export default Home;