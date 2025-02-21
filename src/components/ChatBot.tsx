import React, { useState, useRef } from "react";
import { Mic, Send, Video, Loader2 } from "lucide-react";

const ChatBot: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; media?: string }[]>([]);
  const [recording, setRecording] = useState(false);
  const [mediaURL, setMediaURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaChunks = useRef<Blob[]>([]);

  const handleSendMessage = async (message: string, media: string | null = null) => {
    if (!message.trim() && !media) return;

    setMessages((prev) => [...prev, { text: message, sender: "user", media }]);
    setLoading(true);

    // Simulating bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Your message has been processed!", sender: "bot" }]);
      setLoading(false);
    }, 2000);

    setQuery("");
    setMediaURL(null);
  };

  const startRecording = async (type: "audio" | "video") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        type === "audio" ? { audio: true } : { video: true, audio: true }
      );
      mediaRecorder.current = new MediaRecorder(stream);
      mediaChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) mediaChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const mediaBlob = new Blob(mediaChunks.current, { type: type === "audio" ? "audio/wav" : "video/mp4" });
        const mediaURL = URL.createObjectURL(mediaBlob);
        setMediaURL(mediaURL);
        setRecording(false);
      };

      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Recording error:", error);
    }
  };

  const stopRecording = (type: "audio" | "video") => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl flex flex-col h-[90vh] overflow-hidden">
        {/* Chat Header */}
        <div className="text-center font-bold text-lg bg-blue-600 text-white py-3">💬 AI Chatbot</div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`p-3 rounded-lg text-white max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-800"}`}>
              {msg.text}
              {msg.media && (
                <div className="mt-2">
                  {msg.media.includes("video") ? (
                    <video controls src={msg.media} className="w-full rounded-md" />
                  ) : (
                    <audio controls src={msg.media} className="w-full" />
                  )}
                </div>
              )}
            </div>
          ))}
          {loading && <Loader2 className="animate-spin text-gray-500 mx-auto" />}
        </div>

        {/* Media Preview */}
        {mediaURL && (
          <div className="p-2 bg-gray-200 text-center">
            {mediaURL.includes("video") ? <video controls src={mediaURL} className="w-full rounded-md" /> : <audio controls src={mediaURL} className="w-full" />}
            <button onClick={() => handleSendMessage(mediaURL.includes("video") ? "[📹 Video Message]" : "[🎤 Audio Message]", mediaURL)} className="mt-2 p-2 bg-green-500 text-white rounded-lg w-full">
              Send Media
            </button>
          </div>
        )}

        {/* Input & Buttons */}
        <div className="p-2 border-t bg-gray-50 flex items-center space-x-1 rounded-b-xl">
          {recording ? (
            <>
              <button onClick={() => stopRecording("audio")} className="p-2 bg-red-500 text-white rounded-full">
                Stop 🎤
              </button>
              <button onClick={() => stopRecording("video")} className="p-2 bg-red-500 text-white rounded-full">
                Stop 📹
              </button>
            </>
          ) : (
            <>
              <button onClick={() => startRecording("audio")} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <Mic className="w-5 h-5" />
              </button>
              <button onClick={() => startRecording("video")} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
          <input
            type="text"
            placeholder="Type your message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 text-sm border rounded-lg focus:ring focus:ring-blue-400"
          />
          <button onClick={() => handleSendMessage(query)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
