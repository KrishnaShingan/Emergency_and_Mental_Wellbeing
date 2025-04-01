import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      return;
    }

    const response = await loginUser({ email, password });
    if (response?.token) {
      setSuccess("Login successful! Redirecting...");
      const userData = { email, username: response.username, token: response.token };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userEmail", email);
      setTimeout(() => {
        setUser(userData);
        navigate("/home");
      }, 1500);
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-medium text-gray-700 text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Your email"
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 flex flex-col items-center">
          <button
            className="text-teal-600 hover:underline text-sm"
            onClick={() => navigate("/register")}
          >
            Don’t have an account? Register
          </button>
          <button
            className="text-teal-600 hover:underline text-sm mt-2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;