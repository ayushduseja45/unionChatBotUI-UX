// import React, { useState, useRef } from "react";
// import { Mic, Send, Video, Loader2 } from "lucide-react";

// const ChatBot: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; media?: string }[]>([]);
//   const [recording, setRecording] = useState(false);
//   const [mediaURL, setMediaURL] = useState<string | null>(null);
//   const mediaRecorder = useRef<MediaRecorder | null>(null);
//   const mediaChunks = useRef<Blob[]>([]);

//   const handleSendMessage = async (message: string, media: string | null = null) => {
//     if (!message.trim() && !media) return;

//     setMessages((prev) => [...prev, { text: message, sender: "user", media }]);
//     setLoading(true);

//     // Simulating bot response
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: "Your message has been processed!", sender: "bot" }]);
//       setLoading(false);
//     }, 2000);

//     setQuery("");
//     setMediaURL(null);
//   };

//   const startRecording = async (type: "audio" | "video") => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia(
//         type === "audio" ? { audio: true } : { video: true, audio: true }
//       );
//       mediaRecorder.current = new MediaRecorder(stream);
//       mediaChunks.current = [];

//       mediaRecorder.current.ondataavailable = (event) => {
//         if (event.data.size > 0) mediaChunks.current.push(event.data);
//       };

//       mediaRecorder.current.onstop = () => {
//         const mediaBlob = new Blob(mediaChunks.current, { type: type === "audio" ? "audio/wav" : "video/mp4" });
//         const mediaURL = URL.createObjectURL(mediaBlob);
//         setMediaURL(mediaURL);
//         setRecording(false);
//       };

//       mediaRecorder.current.start();
//       setRecording(true);
//     } catch (error) {
//       console.error("Recording error:", error);
//     }
//   };

//   const stopRecording = (type: "audio" | "video") => {
//     mediaRecorder.current?.stop();
//     setRecording(false);
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-2">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl flex flex-col h-[90vh] overflow-hidden">
//         {/* Chat Header */}
//         <div className="text-center font-bold text-lg bg-blue-600 text-white py-3">💬 AI Chatbot</div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-3 space-y-3">
//           {messages.map((msg, index) => (
//             <div key={index} className={`p-3 rounded-lg text-white max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-800"}`}>
//               {msg.text}
//               {msg.media && (
//                 <div className="mt-2">
//                   {msg.media.includes("video") ? (
//                     <video controls src={msg.media} className="w-full rounded-md" />
//                   ) : (
//                     <audio controls src={msg.media} className="w-full" />
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//           {loading && <Loader2 className="animate-spin text-gray-500 mx-auto" />}
//         </div>

//         {/* Media Preview */}
//         {mediaURL && (
//           <div className="p-2 bg-gray-200 text-center">
//             {mediaURL.includes("video") ? <video controls src={mediaURL} className="w-full rounded-md" /> : <audio controls src={mediaURL} className="w-full" />}
//             <button onClick={() => handleSendMessage(mediaURL.includes("video") ? "[📹 Video Message]" : "[🎤 Audio Message]", mediaURL)} className="mt-2 p-2 bg-green-500 text-white rounded-lg w-full">
//               Send Media
//             </button>
//           </div>
//         )}

//         {/* Input & Buttons */}
//         <div className="p-2 border-t bg-gray-50 flex items-center space-x-1 rounded-b-xl">
//           {recording ? (
//             <>
//               <button onClick={() => stopRecording("audio")} className="p-2 bg-red-500 text-white rounded-full">
//                 Stop 🎤
//               </button>
//               <button onClick={() => stopRecording("video")} className="p-2 bg-red-500 text-white rounded-full">
//                 Stop 📹
//               </button>
//             </>
//           ) : (
//             <>
//               <button onClick={() => startRecording("audio")} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//                 <Mic className="w-5 h-5" />
//               </button>
//               <button onClick={() => startRecording("video")} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//                 <Video className="w-5 h-5 text-gray-600" />
//               </button>
//             </>
//           )}
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-1 p-2 text-sm border rounded-lg focus:ring focus:ring-blue-400"
//           />
//           <button onClick={() => handleSendMessage(query)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;




import React, { useState, useRef, useEffect } from "react";
import { Mic, Send, Video, Loader2, X } from "lucide-react";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. You can send me text, audio, or video messages.", sender: "bot" }
  ]);
  const [recording, setRecording] = useState(false);
  const [recordingType, setRecordingType] = useState(null);
  const [mediaURL, setMediaURL] = useState(null);
  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const streamRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, mediaURL]);

  // Clean up media streams when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message, media = null) => {
    if ((!message || !message.trim()) && !media) return;

    const newUserMessage = { 
      text: message, 
      sender: "user", 
      media: media 
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      
      if (media) {
        if (media.includes("video")) {
          botResponse = "I've received your video message. How can I help you with this?";
        } else {
          botResponse = "I've received your audio message. Let me process what you said.";
        }
      } else {
        botResponse = `Thanks for your message: "${message}". How can I assist you further?`;
      }
      
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
      setLoading(false);
    }, 1500);

    setQuery("");
    setMediaURL(null);
  };

  const startRecording = async (type) => {
    try {
      // For video, specifically request the front camera
      const constraints = type === "audio" 
        ? { audio: true } 
        : { 
            video: { 
              facingMode: "user", // This requests the front camera
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }, 
            audio: true 
          };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      // If it's a video recording, show the preview
      if (type === "video" && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: type === "audio" ? "audio/webm" : "video/webm"
      });
      mediaChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const mediaBlob = new Blob(mediaChunks.current, { 
          type: type === "audio" ? "audio/webm" : "video/webm" 
        });
        const url = URL.createObjectURL(mediaBlob);
        setMediaURL(url);
        setRecording(false);
        setRecordingType(null);
        
        // Stop all tracks in the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        
        // Clear the live video preview
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
        }
      };

      mediaRecorder.current.start();
      setRecording(true);
      setRecordingType(type);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert(`Cannot access ${type} device. Please check permissions.`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setMediaURL(null);
    }
  };

  const cancelMedia = () => {
    setMediaURL(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(query);
    }
  };

  const getMediaLabel = () => {
    return recordingType === "audio" 
      ? "Recording audio..." 
      : "Recording video...";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-0 sm:p-2">
      <div className="w-full max-w-md bg-white shadow-lg rounded-none sm:rounded-xl flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <div className="text-center font-bold text-lg bg-blue-600 text-white py-3 px-4 flex items-center justify-center sticky top-0 z-10">
          <span className="mr-2">💬</span> AI Chatbot
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg max-w-[85%] ${
                msg.sender === "user" 
                  ? "bg-blue-500 text-white ml-auto" 
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div>{msg.text}</div>
              {msg.media && (
                <div className="mt-2">
                  {msg.media.includes("video") ? (
                    <video 
                      controls 
                      src={msg.media} 
                      className="w-full rounded-md max-h-48"
                    />
                  ) : (
                    <audio 
                      controls 
                      src={msg.media} 
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-gray-500" size={24} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Live Video Preview during recording */}
        {recording && recordingType === "video" && (
          <div className="relative bg-black">
            <video 
              ref={videoPreviewRef}
              className="w-full h-48 object-cover"
              muted
              playsInline
            />
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button 
                onClick={cancelRecording} 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                aria-label="Cancel recording"
              >
                <X size={20} className="text-gray-700" />
              </button>
              <button 
                onClick={stopRecording} 
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                aria-label="Stop recording"
              >
                <span className="block w-3 h-3 rounded-sm"></span>
              </button>
            </div>
          </div>
        )}

        {/* Recording Status - Only show for audio or when not showing video preview */}
        {recording && (recordingType === "audio") && (
          <div className="p-3 bg-red-50 border-t border-red-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
              <span className="text-red-600 font-medium">{getMediaLabel()}</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={cancelRecording} 
                className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                aria-label="Cancel recording"
              >
                <X size={18} className="text-gray-700" />
              </button>
              <button 
                onClick={stopRecording} 
                className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                aria-label="Stop recording"
              >
                <span className="block w-3 h-3 rounded-sm"></span>
              </button>
            </div>
          </div>
        )}

        {/* Media Preview */}
        {mediaURL && !recording && (
          <div className="p-3 bg-gray-100 border-t">
            <div className="relative">
              <button 
                onClick={cancelMedia} 
                className="absolute top-1 right-1 p-1 bg-gray-800 bg-opacity-70 rounded-full text-white z-10"
                aria-label="Remove media"
              >
                <X size={16} />
              </button>
              {mediaURL.includes("video") ? (
                <video 
                  controls 
                  src={mediaURL} 
                  className="w-full rounded-md max-h-48"
                />
              ) : (
                <audio 
                  controls 
                  src={mediaURL} 
                  className="w-full"
                />
              )}
            </div>
            <button 
              onClick={() => handleSendMessage(
                mediaURL.includes("video") ? "Video message" : "Audio message", 
                mediaURL
              )} 
              className="mt-2 p-2 bg-green-500 text-white rounded-lg w-full flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <Send size={16} className="mr-2" />
              Send {mediaURL.includes("video") ? "Video" : "Audio"}
            </button>
          </div>
        )}

        {/* Input & Buttons */}
        <div className="p-2 border-t bg-gray-50 flex items-center space-x-2 rounded-b-xl sticky bottom-0">
          {!recording && (
            <>
              <button 
                onClick={() => startRecording("audio")} 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors flex-shrink-0"
                aria-label="Record audio"
                disabled={recording}
              >
                <Mic size={20} className="text-gray-700" />
              </button>
              <button 
                onClick={() => startRecording("video")} 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors flex-shrink-0"
                aria-label="Record video"
                disabled={recording}
              >
                <Video size={20} className="text-gray-700" />
              </button>
            </>
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none min-w-0"
            disabled={recording}
          />
          <button 
            onClick={() => handleSendMessage(query)} 
            className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${
              query.trim() 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!query.trim() || recording}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;