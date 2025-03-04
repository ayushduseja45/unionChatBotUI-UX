import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Square, Play, CheckCircle, X, Loader2 } from 'lucide-react';

const VideoAuth = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [randomString, setRandomString] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [maxDuration] = useState(10); // 10 seconds max recording
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoPreviewRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const durationTimerRef = useRef(null);

  // Generate a random string for the user to read
  useEffect(() => {
    const generateRandomString = () => {
      const words = [
        'apple', 'banana', 'orange', 'grape', 'kiwi',
        'blue', 'green', 'red', 'yellow', 'purple',
        'dog', 'cat', 'bird', 'fish', 'rabbit',
        'happy', 'sunny', 'rainy', 'cloudy', 'windy'
      ];
      
      // Select 3 random words
      const selectedWords = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWords.push(words[randomIndex]);
      }
      
      return selectedWords.join(' ');
    };
    
    setRandomString(generateRandomString());
  }, []);

  // Check if camera is available
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(() => setHasCamera(true))
      .catch(() => setHasCamera(false));
      
    return () => {
      // Clean up
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // Start with a 3-second countdown
      setCountdown(3);
      
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            initiateRecording();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
      timerRef.current = countdownTimer;
    } catch (err) {
      console.error('Error starting recording:', err);
      setHasCamera(false);
    }
  };
  
  const initiateRecording = async () => {
    try {
      const constraints = {
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      // Show live preview
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        setIsRecording(false);
        
        // Stop all tracks in the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        
        // Clear the live video preview
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
        }
        
        if (durationTimerRef.current) {
          clearInterval(durationTimerRef.current);
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start duration timer
      const durationTimer = setInterval(() => {
        setRecordingDuration(prev => {
          const newDuration = prev + 1;
          if (newDuration >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return newDuration;
        });
      }, 1000);
      
      durationTimerRef.current = durationTimer;
      
      // Auto-stop after maxDuration
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, maxDuration * 1000);
    } catch (err) {
      console.error('Error initiating recording:', err);
      setHasCamera(false);
      setCountdown(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setVideoURL(null);
      setVideoBlob(null);
    } else if (videoURL) {
      setVideoURL(null);
      setVideoBlob(null);
    }
    
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }
  };

  const playRecording = () => {
    if (videoURL) {
      const videoElement = document.createElement('video');
      videoElement.src = videoURL;
      videoElement.play();
    }
  };

  const handleVerification = async () => {
    if (!videoBlob) return;
    
    setIsProcessing(true);
    // Simulate verification processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // Navigate to dashboard or next step after successful verification
    navigate('/dashboard');
  };

  const retakeVideo = () => {
    setVideoURL(null);
    setVideoBlob(null);
  };

  if (!hasCamera) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <Video className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No camera detected</h3>
              <p className="mt-1 text-sm text-gray-500">Please ensure your device has a working camera and microphone.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Video className="w-12 h-12 sm:w-16 sm:h-16 text-blue-900" />
        </div>
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Video Authentication
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please read the following phrase while recording:
        </p>
        <p className="mt-1 text-center text-lg font-medium text-blue-900 bg-blue-50 p-2 rounded-md">
          "{randomString}"
        </p>
      </div>

      <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4 sm:space-y-6">
            {/* Countdown overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20 rounded-lg">
                <div className="text-6xl font-bold text-white animate-pulse">
                  {countdown}
                </div>
              </div>
            )}
            
            {/* Video preview or recorded video */}
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              {isRecording ? (
                <>
                  <video 
                    ref={videoPreviewRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute top-2 right-2 flex items-center space-x-2 bg-black bg-opacity-50 px-2 py-1 rounded-full">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      {recordingDuration}s / {maxDuration}s
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded-md">
                    <p className="text-white text-sm font-medium">
                      Say: "{randomString}"
                    </p>
                  </div>
                </>
              ) : videoURL ? (
                <video 
                  src={videoURL} 
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <Video className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-400 text-center px-4">
                    Click "Start Recording" to begin your video authentication
                  </p>
                </div>
              )}
            </div>

            {/* Recording controls */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              {!isRecording && !videoURL ? (
                <button
                  onClick={startRecording}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                >
                  Start Recording
                  <Video className="ml-2 h-4 w-4" />
                </button>
              ) : isRecording ? (
                <div className="flex space-x-3 w-full">
                  <button
                    onClick={cancelRecording}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-1/2"
                  >
                    Cancel
                    <X className="ml-2 h-4 w-4" />
                  </button>
                  <button
                    onClick={stopRecording}
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-1/2"
                  >
                    Stop
                    <Square className="ml-2 h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={retakeVideo}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-1/2"
                  >
                    Retake Video
                    <Video className="ml-2 h-4 w-4" />
                  </button>
                  <button
                    onClick={handleVerification}
                    disabled={isProcessing}
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-1/2"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Verify Identity
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
            
            {/* Instructions */}
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-900">Instructions:</h4>
              <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Position your face clearly in the frame</li>
                <li>Speak clearly and read the phrase shown above</li>
                <li>Ensure good lighting and minimal background noise</li>
                <li>The recording will automatically stop after {maxDuration} seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAuth;