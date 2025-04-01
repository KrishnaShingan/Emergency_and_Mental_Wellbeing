import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PaperAirplaneIcon, XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";


const Support = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m here to assist with mental wellbeing and emergencies. How can I help?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.post("http://localhost:8080/chatbot/send", { message: input });
      setMessages((prev) => [...prev, { sender: "bot", text: response.data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="bg-teal-600 text-white p-4 flex justify-between items-center">
          <span className="font-medium text-lg">AI Chat Assistant</span>
          <button className="hover:opacity-80">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-md shadow-sm ${
                  msg.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && <div className="text-gray-600 animate-pulse">AI is typing...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="border-t p-3 flex items-center bg-gray-50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition duration-200"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Support;