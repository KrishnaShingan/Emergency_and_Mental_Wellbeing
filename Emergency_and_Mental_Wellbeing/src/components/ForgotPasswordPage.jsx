import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSecurityQuestion, resetPassword } from "../api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const response = await getSecurityQuestion(email);
    if (response?.securityQuestion) {
      setSecurityQuestion(response.securityQuestion);
      setStep(2);
    } else {
      setError("User not found!");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword(email, securityAnswer, newPassword);
    if (response === "Password reset successful") {
      setSuccess("Password changed! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(response || "Incorrect answer!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-sm rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-medium text-gray-700 text-center mb-6">Forgot Password</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <label className="block text-gray-600 font-medium mb-2">Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Your email"
              required
            />
            <button
              type="submit"
              className="w-full mt-4 bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit}>
            <p className="text-gray-600 font-medium mb-2">{securityQuestion}</p>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
              placeholder="Your answer"
              required
            />
            <label className="block text-gray-600 font-medium mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
              placeholder="New password"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}

        <button
          className="text-teal-600 hover:underline text-sm mt-4 block text-center"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;