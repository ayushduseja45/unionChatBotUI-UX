// import React from 'react';
// import { 
//   Video, 
//   Calendar, 
//   Ticket, 
//   Search, 
//   PieChart,
//   UserCircle 
// } from 'lucide-react';

// const Dashboard = () => {
//   const features = [
//     { icon: <Video className="w-6 h-6" />, title: 'Submit Query', description: 'Video/Audio/Text' },
//     { icon: <Calendar className="w-6 h-6" />, title: 'Schedule Appointment', description: 'Book a meeting' },
//     { icon: <Ticket className="w-6 h-6" />, title: 'Active Services', description: 'View tickets' },
//     { icon: <Search className="w-6 h-6" />, title: 'Track Requests', description: 'Check status' },
//     { icon: <PieChart className="w-6 h-6" />, title: 'Insights', description: 'Personalized offers' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-blue-900 text-white p-6">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Welcome, User</h1>
//             <p className="text-blue-200">How can we help you today?</p>
//           </div>
//           <UserCircle className="w-10 h-10" />
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div className="flex items-center space-x-4">
//                 <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
//                   {feature.icon}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* AI Assistant Card */}
//         <div className="mt-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold mb-2">UVA - Your AI Assistant</h2>
//               <p className="text-blue-100">Get instant help with your banking queries</p>
//               <button className="mt-4 bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//                 Start Chat
//               </button>
//             </div>
//             <div className="hidden md:block">
//               {/* Placeholder for AI Assistant illustration */}
//               <div className="w-24 h-24 bg-blue-800 rounded-full opacity-50"></div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { 
  Video, 
  Calendar, 
  Ticket, 
  Search, 
  PieChart, 
  UserCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    { 
      icon: <Video className="w-6 h-6" />, 
      title: 'Submit Query', 
      description: 'Video/Audio/Text',
      action: () => navigate('/query-submission')
    },
    { icon: <Calendar className="w-6 h-6" />, title: 'Schedule Appointment', description: 'Book a meeting' },
    { icon: <Ticket className="w-6 h-6" />, title: 'Active Services', description: 'View tickets' },
    { icon: <Search className="w-6 h-6" />, title: 'Track Requests', description: 'Check status' },
    { icon: <PieChart className="w-6 h-6" />, title: 'Insights', description: 'Personalized offers' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome, User</h1>
            <p className="text-red-200">How can we help you today?</p>
          </div>
          {/* <UserCircle className="w-10 h-10" /> */}
          <UserCircle 
            className="w-10 h-10 cursor-pointer hover:text-gray-300 transition"
            onClick={() => navigate("/profile")} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={feature.action ? feature.action : undefined}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-lg text-red-900">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Assistant Card */}
        <div className="mt-8 bg-gradient-to-r from-red-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">UVA - Your AI Assistant</h2>
              <p className="text-red-100">Get instant help with your banking queries</p>
              <button 
              onClick={() => navigate("/chat-bot")} 
                className="mt-4 bg-white text-red-900 px-6 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
              >
                Start Chat
              </button>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for AI Assistant illustration */}
              <div className="w-24 h-24 bg-red-800 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
