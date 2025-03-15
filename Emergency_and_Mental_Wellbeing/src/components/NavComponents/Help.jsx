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
        (error) => {
          console.error("Error getting location:", error);
        }
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

    // 1️⃣ Save location in MongoDB
    try {
        const response = await axios.post("http://localhost:8080/api/location/save", {
            phoneNumber,
            address,
            latitude: position.lat,
            longitude: position.lng,
        });

        console.log("✅ Location saved:", response.data); // ✅ Log instead of alert
    } catch (error) {
        console.error("❌ Error saving location:", error);
        alert("Failed to save location.");
    }

    // 2️⃣ Send location via WhatsApp
    const message = `My current location: ${address}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
};


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📍 Send Your Location</h2>
        <p className="text-gray-600 mb-4">Share your current location for immediate assistance.</p>

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-center"
        />

        <button
          onClick={getLocation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-4"
        >
          Get Current Location
        </button>

        {position && (
          <>
            <p className="text-gray-700 font-semibold mb-2">Address: {address || "Fetching..."}</p>
            <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md mb-4">
              <MapContainer center={[position.lat, position.lng]} zoom={13} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[position.lat, position.lng]}>
                  <Popup>You are here</Popup>
                </Marker>
              </MapContainer>
            </div>
            <button
              onClick={sendLocation}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              SEND MY LIVE LOCATION 📩
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Help
