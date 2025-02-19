import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Square, Play, CheckCircle } from 'lucide-react';

const AudioRecognition = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasMicrophone, setHasMicrophone] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Check if microphone is available
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasMicrophone(true))
      .catch(() => setHasMicrophone(false));
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setHasMicrophone(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.play();
    }
  };

  const handleVerification = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    // Simulate voice recognition processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    navigate('/dashboard');
  };

  if (!hasMicrophone) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <Mic className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No microphone detected</h3>
              <p className="mt-1 text-sm text-gray-500">Please ensure your device has a working microphone.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mic className="w-16 h-16 text-blue-900" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Voice Recognition
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please read the following phrase:
          <br />
          <span className="font-medium text-blue-900">
            "My voice is my password"
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className={`p-8 rounded-full ${isRecording ? 'bg-red-100' : 'bg-gray-100'}`}>
                <Mic className={`w-12 h-12 ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start Recording
                  <Mic className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Stop Recording
                  <Square className="ml-2 h-4 w-4" />
                </button>
              )}

              {audioBlob && !isRecording && (
                <button
                  onClick={playRecording}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Play Recording
                  <Play className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>

            {audioBlob && !isRecording && (
              <button
                onClick={handleVerification}
                disabled={isProcessing}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    Verify Voice <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioRecognition;