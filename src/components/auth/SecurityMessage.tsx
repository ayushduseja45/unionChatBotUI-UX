// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SecurityMessage = () => {
//   const [agreed, setAgreed] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
//         <h1 className="text-2xl font-bold text-gray-800">🔒 Security Compliance</h1>
//         <p className="text-gray-600 mt-3">
//           For security reasons, all interactions are monitored and encrypted. By proceeding, you agree to our terms of service and privacy policy.
//         </p>
//         <div className="mt-4">
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               className="form-checkbox text-blue-500"
//               onChange={() => setAgreed(!agreed)}
//             />
//             <span className="ml-2 text-sm text-gray-700">I Agree to the Terms & Privacy Policy</span>
//           </label>
//         </div>
//         <button
//           onClick={() => navigate("/login")}
//           disabled={!agreed}
//           className={`mt-5 w-full px-4 py-2 rounded-lg text-white font-semibold ${
//             agreed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Proceed to Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SecurityMessage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SecurityMessage = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-600 to-blue-700 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full text-center border border-gray-200">
        {/* 🔒 Icon & Title */}
        <h1 className="text-3xl font-extrabold text-blue-700">🔒 Security Compliance</h1>
        
        {/* Information Text */}
        <p className="text-gray-700 mt-4 leading-relaxed">
          Your data is protected with <span className="text-red-600 font-semibold">advanced encryption</span>. By proceeding, 
          you confirm that you agree to our <span className="text-blue-600 font-medium">Terms of Service</span> and <span className="text-blue-600 font-medium">Privacy Policy</span>.
        </p>
        
        {/* Agreement Checkbox */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            id="agree"
            className="w-5 h-5 text-red-500 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agree" className="text-gray-800 text-sm cursor-pointer">
            I Agree to the Terms & Privacy Policy
          </label>
        </div>

        {/* Proceed Button */}
        <button
          onClick={() => navigate("/login")}
          disabled={!agreed}
          className={`mt-6 w-full px-5 py-3 rounded-lg text-white font-semibold transition ${
            agreed
              ? "bg-gradient-to-r from-red-600 to-blue-600 hover:opacity-90 shadow-md"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Proceed to Login
        </button>
      </div>
    </div>
  );
};

export default SecurityMessage;
