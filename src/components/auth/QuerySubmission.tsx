import React, { useState } from "react";
import { Video, Mic, Send, CheckCircle } from "lucide-react";

const QuerySubmission = () => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("Live transcription will appear here...");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = ["Loans", "Accounts", "Cards", "Payments", "Others"];

  const handleRecord = () => {
    setRecording(!recording);
    setTranscription("AI-generated transcription in progress...");
    setTimeout(() => setTranscription("This is a sample AI-generated transcription."), 2000);
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900"> Submit a Query</h1>
        <p className="text-gray-600 mt-2">Record your question and get AI-assisted transcription.</p>

        {/* Recording Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button 
            className={`p-4 rounded-full shadow-md transition ${
              recording ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
            }`} 
            onClick={handleRecord}
          >
            <Video className="w-6 h-6" />
          </button>
          <button 
            className={`p-4 rounded-full shadow-md transition ${
              recording ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`} 
            onClick={handleRecord}
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>

        {/* Live Transcription */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg text-gray-700 text-sm">
          {transcription}
        </div>

        {/* Category Selection */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">Select Category</label>
          <select 
            className="w-full p-3 rounded-lg border text-gray-900 focus:ring-2 focus:ring-red-500"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button 
          className={`mt-6 w-full px-4 py-2 rounded-lg text-white font-semibold transition ${
            selectedCategory ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedCategory}
          onClick={handleSubmit}
        >
          <Send className="inline w-5 h-5 mr-2" /> Submit Query
        </button>

        {/* Confirmation Message */}
        {submitted && (
          <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">Your query has been submitted!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuerySubmission;
