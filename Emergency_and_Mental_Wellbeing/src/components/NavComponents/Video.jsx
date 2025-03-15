import React, { useState, useEffect } from "react";

const Video = () => {
  const [query, setQuery] = useState("Stress");
  const [videos, setVideos] = useState([]);
  const [videoCache, setVideoCache] = useState({}); // ✅ Cache for storing API responses
  const [error, setError] = useState(null);

  const categories = [
    "Self help", "Reducing stress", "Anxiety", "Panic attacks",
    "Breathing exercises", "Stretching", "Calm music", "Meditation"
  ];

  useEffect(() => {
    fetchVideos(query);
  }, [query]);

  const fetchVideos = async (searchTerm) => {
    setError(null);

    // ✅ Check if the result is already in cache
    if (videoCache[searchTerm]) {
      console.log(`⚡ Fetching from cache: ${searchTerm}`);
      setVideos(videoCache[searchTerm]); // Load from cache
      return;
    }

    try {
      console.log(`🔍 Fetching videos from API: ${searchTerm}`);
      const response = await fetch(`http://localhost:8080/api/videos/${searchTerm}`);

      if (!response.ok) {
        console.error(`❌ API Error: ${response.status} - ${response.statusText}`);
        setError(response.status === 403 ? "YouTube API quota exceeded. Try again later." : "Failed to fetch videos.");
        return;
      }

      const text = await response.text();
      if (!text) {
        console.error("⚠️ Empty response from server");
        setError("No videos found.");
        return;
      }

      const data = JSON.parse(text);
      if (!data.items) {
        setError("No videos found.");
        return;
      }

      setVideos(data.items);
      setVideoCache((prevCache) => ({ ...prevCache, [searchTerm]: data.items })); // ✅ Store in cache
    } catch (error) {
      console.error("❌ Network Error:", error.message);
      setError("Failed to load videos. Check your internet connection.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Video Recommendations</h1>
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={() => fetchVideos(query)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setQuery(category)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {category}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {videos.map((video, index) => (
          <div key={index} className="border rounded overflow-hidden">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full"
            />
            <div className="p-3">
              <h3 className="font-bold">{video.snippet.title}</h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
