import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Lock, Bell, CreditCard, Save, Pencil, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Ayush Duseja",
    email: "ayush@example.com",
    phone: "+91 98765 43210",
    aadhaar: "XXXX-XXXX-1234",
    pan: "ABCDE1234F",
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleLogout = () => {
    // Clear user session (example: localStorage.clear())
    localStorage.removeItem("userToken"); // Modify based on your auth logic
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <UserCircle className="w-24 h-24 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Pencil className="w-4 h-4 mr-2" /> {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-gray-700 font-semibold">Personal Details</h3>
            <p className="text-gray-600 mt-1">{user.phone}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-gray-700 font-semibold">Aadhaar & PAN</h3>
              <p className="text-gray-600 mt-1">Aadhaar: {user.aadhaar}</p>
              <p className="text-gray-600">PAN: {user.pan}</p>
            </div>
            <CreditCard className="w-6 h-6 text-gray-500" />
          </div>

          <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h3 className="text-gray-700 font-semibold">Security Settings</h3>
            <Lock className="w-6 h-6 text-gray-500" />
          </div>

          <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h3 className="text-gray-700 font-semibold">Notification Preferences</h3>
            <Bell className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Save & Logout Buttons */}
        <div className="mt-6 space-y-4">
          {editing && (
            <button
              onClick={handleEditToggle}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" /> Save Changes
            </button>
          )}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
