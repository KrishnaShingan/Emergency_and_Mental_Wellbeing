import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([firstName, lastName, email, password, securityQuestion, securityAnswer].some((field) => !field.trim())) {
      setError("All fields are required!");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must have 1 uppercase, 1 number, 1 special character, and be 8+ characters.");
      return;
    }

    const response = await registerUser({ firstName, lastName, email, password, securityQuestion, securityAnswer });
    if (response === "User registered successfully!") {
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(response || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-medium text-gray-700 text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="First name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Last name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Your password"
            required
          />
          <p className="text-xs text-gray-500 mt-1">1 uppercase, 1 number, 1 special character, 8+ chars</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Security Question</label>
          <select
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select a question</option>
            <option value="What is your pet's name?">What is your pet's name?</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What is your favorite book?">What is your favorite book?</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Answer</label>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Your answer"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
        >
          Register
        </button>

        <Link to="/login" className="text-teal-600 hover:underline text-sm mt-4 block text-center">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default RegistrationPage;