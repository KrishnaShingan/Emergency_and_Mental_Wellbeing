import React, { useState, useEffect } from "react";
import axios from "axios"; // Using axios for consistency with other components

const Profile = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(""); // Add error state for feedback

  // Fetch profile data on mount
  const fetchProfile = async () => {
    const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored here
    const token = localStorage.getItem("authToken"); // Assuming token-based auth
    if (!userEmail || !token) {
      setError("User not authenticated. Please log in.");
      console.error("No email or token found in localStorage");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/profile?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token if required by backend
        },
      });
      if (response.data) {
        setUserData({
          email: response.data.email || userEmail,
          name: response.data.name || "",
          phone: response.data.phone || "",
          location: response.data.location || "",
        });
      } else {
        setError("Profile not found.");
        console.error("No data returned from profile API");
      }
    } catch (error) {
      setError("Failed to fetch profile. Please try again.");
      console.error("Error fetching profile:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save updated profile data
  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/profile/update",
        userData, // Send the full userData object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        fetchProfile(); // Refresh profile data after save
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-medium text-gray-700 text-center mb-6">Your Profile</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium">Email:</label>
            <p className="text-gray-800">{userData.email || "Not set"}</p>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-gray-800">{userData.name || "Not set"}</p>
            )}
          </div>
          <div>
            <label className="text-gray-600 font-medium">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-gray-800">{userData.phone || "Not set"}</p>
            )}
          </div>
          <div>
            <label className="text-gray-600 font-medium">Location:</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.location}
                onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-gray-800">{userData.location || "Not set"}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;