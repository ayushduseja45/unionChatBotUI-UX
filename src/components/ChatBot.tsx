import React, { useState } from "react";
import { Mic, Send, Video, MessageSquare, Loader2 } from "lucide-react";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  
  const handleSendMessage = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setMessages([...messages, { text: query, sender: "user" }]);

    // Simulating bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you! Your query is being processed.", sender: "bot" },
      ]);
      setLoading(false);
    }, 2000);

    setQuery("");
  };

  const handleAudioRecord = () => {
    alert("Audio recording feature coming soon! 🎙️");
  };

  const handleVideoRecord = () => {
    alert("Video recording feature coming soon! 📹");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl flex flex-col h-[90vh]">
        {/* Chat Header */}
        <div className="text-center font-bold text-xl text-red-600 p-4 border-b bg-blue-900 text-white rounded-t-2xl">
          💬 AI Chatbot
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-white max-w-xs ${
                msg.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <Loader2 className="animate-spin text-gray-500 mx-auto" />}
        </div>

        {/* Input & Buttons */}
        <div className="p-3 border-t bg-gray-100 flex items-center space-x-2 rounded-b-2xl">
          <button onClick={handleAudioRecord} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handleVideoRecord} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            placeholder="Type your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
