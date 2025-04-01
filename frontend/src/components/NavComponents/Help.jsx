import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const Help = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setAddress(data.display_name);
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const sendLocation = async () => {
    if (!address || !phoneNumber || !position) {
      alert("Please enter a valid phone number and get your location first.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/location/save", {
        phoneNumber,
        address,
        latitude: position.lat,
        longitude: position.lng,
      });
      const message = `My current location: ${address}`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    } catch (error) {
      console.error("Error saving location:", error);
      alert("Failed to save location.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-medium text-gray-700 text-center mb-4">
          Emergency Location Sharing
        </h2>
        <p className="text-gray-600 text-center mb-6">Share your location for immediate help.</p>

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
        />

        <button
          onClick={getLocation}
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200 mb-4"
        >
          Get Location
        </button>

        {position && (
          <>
            <p className="text-gray-600 mb-4">Address: {address || "Fetching..."}</p>
            <div className="w-full h-64 rounded-md overflow-hidden shadow-sm mb-4">
              <MapContainer center={[position.lat, position.lng]} zoom={13} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[position.lat, position.lng]}>
                  <Popup>You are here</Popup>
                </Marker>
              </MapContainer>
            </div>
            <button
              onClick={sendLocation}
              className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-200"
            >
              Send Emergency Location
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Help;