import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ban as Bank, User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'biometric'>('credentials');
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'credentials') {
      // Handle credentials login
      navigate('/dashboard');
    } else {
      // Start biometric verification flow
      navigate('/verify/face');
    }
  };

  const startNewRegistration = () => {
    navigate('/verify/aadhaar');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {/* <Bank className="w-16 h-16 text-blue-900" /> */}
          <img src='logo.png' className='w-20 h-20'/>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Vyom AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Union Bank of India's Next-Gen Banking
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setLoginMethod('credentials')}
              className={`px-4 py-2 rounded-md ${
                loginMethod === 'credentials'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Credentials
            </button>
            <button
              onClick={() => setLoginMethod('biometric')}
              className={`px-4 py-2 rounded-md ${
                loginMethod === 'biometric'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Biometric
            </button>
          </div>

          {loginMethod === 'credentials' ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                  Customer ID
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="customerId"
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate('/verify/video')}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Face Recognition
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Vyom AI?</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={startNewRegistration}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register with Aadhaar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;