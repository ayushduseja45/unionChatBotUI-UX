import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ban as Bank } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/scmsg'); // Changed from /dashboard to /login for proper flow
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center">
      <div className="animate-fade-in text-center">
        {/* <Bank className="w-24 h-24 text-white mb-6 animate-pulse" /> */}
        <img src='logo.png' className='w-24 h-24 ml-6'  />
        <h1 className="text-4xl font-bold text-white mb-2">Vyom AI</h1>
        <p className="text-blue-100 text-lg">Union Bank of India</p>
        <div className="mt-8">
          <div className="w-16 h-16 border-t-4 border-blue-200 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;