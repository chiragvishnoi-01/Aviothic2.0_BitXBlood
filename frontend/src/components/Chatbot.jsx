import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaExpand, FaCompress } from "react-icons/fa";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext.jsx";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your BloodLink assistant powered by AI. How can I help you with blood donation today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Send message to chatbot API
      const response = await axios.post("/chatbot/message", {
        message: inputValue
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Chat Button - Positioned on the right down side */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 rounded-full shadow-2xl z-50 hover:from-red-700 hover:to-rose-700 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      {/* Chat Window - Positioned on the right down side */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            className="fixed bottom-24 right-6 w-full max-w-md h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden glassmorphism-effect"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaRobot className="text-2xl" />
                <div>
                  <h3 className="font-bold text-lg">BloodLink AI Assistant</h3>
                  <p className="text-red-100 text-xs">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleMinimize}
                  className="text-red-100 hover:text-white transition-colors"
                >
                  <FaCompress className="text-lg" />
                </button>
                <button
                  onClick={toggleChat}
                  className="text-red-100 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && (
                        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaRobot className="text-xs" />
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="bg-white/20 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-xs" />
                        </div>
                      )}
                      <div>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.sender === "user" ? "text-red-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm p-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                        <FaRobot className="text-xs" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about donors, blood types, donation process..."
                  className="flex-1 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows="1"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-3 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI-powered assistant for blood donation information
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat Window */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            className="fixed bottom-24 right-6 w-64 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot className="text-lg" />
                <span className="font-bold text-sm">AI Assistant</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleMinimize}
                  className="text-red-100 hover:text-white transition-colors"
                >
                  <FaExpand className="text-sm" />
                </button>
                <button
                  onClick={toggleChat}
                  className="text-red-100 hover:text-white transition-colors"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;