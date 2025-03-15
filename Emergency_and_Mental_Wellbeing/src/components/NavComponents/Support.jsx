import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PaperAirplaneIcon, XIcon, UserIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

const Support = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "👋 Hello! I’m here to assist you with mental wellbeing and emergencies. How can I help?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // ✅ Small delay for a natural feel
      const response = await axios.post("http://localhost:8080/chatbot/send", { message: input });

      let botReply = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("❌ Chatbot error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "⚠️ Oops! Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-200 text-gray-900">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="w-full max-w-lg shadow-lg rounded-xl bg-white border border-gray-300 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
          <span className="font-semibold text-lg">💬 AI Chat Assistant</span>
          <button className="text-white hover:opacity-80">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-center space-x-2">
                {msg.sender === "bot"}
                <div
                  className={`p-3 text-base rounded-lg shadow ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && <UserIcon className="w-6 h-6 text-blue-500" />}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm animate-pulse">✍️ AI is typing...</div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="border-t p-3 flex items-center bg-gray-50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // ✅ Press Enter to send message
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Support;
