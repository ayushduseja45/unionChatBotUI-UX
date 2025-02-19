import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, CheckCircle } from 'lucide-react';

const FaceRecognition = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasWebcam, setHasWebcam] = useState(true);

  useEffect(() => {
    // Check if webcam is available
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasWebcam(true))
      .catch(() => setHasWebcam(false));
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleVerification = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    // Simulate face recognition processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    navigate('/verify/voice');
  };

  const retake = () => {
    setCapturedImage(null);
  };

  if (!hasWebcam) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No webcam detected</h3>
              <p className="mt-1 text-sm text-gray-500">Please ensure your device has a working webcam.</p>
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
          <Camera className="w-16 h-16 text-blue-900" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Face Recognition
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please position your face within the frame
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="relative">
              {!capturedImage ? (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-lg"
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                      facingMode: "user"
                    }}
                  />
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none"></div>
                </>
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured face"
                  className="w-full rounded-lg"
                />
              )}
            </div>

            {!capturedImage ? (
              <button
                onClick={capture}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Capture Photo
              </button>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={retake}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Retake Photo
                </button>
                <button
                  onClick={handleVerification}
                  disabled={isProcessing}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Verify Face <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;