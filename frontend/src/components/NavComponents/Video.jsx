import React, { useState, useEffect } from "react";

const Video = () => {
  const [query, setQuery] = useState("Stress");
  const [videos, setVideos] = useState([]);
  const [videoCache, setVideoCache] = useState({});
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
    if (videoCache[searchTerm]) {
      setVideos(videoCache[searchTerm]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${searchTerm}`);
      if (!response.ok) {
        setError(response.status === 403 ? "YouTube API quota exceeded." : "Failed to fetch videos.");
        return;
      }
      const data = await response.json();
      if (!data.items) {
        setError("No videos found.");
        return;
      }
      setVideos(data.items);
      setVideoCache((prev) => ({ ...prev, [searchTerm]: data.items }));
    } catch (error) {
      setError("Failed to load videos.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Video Recommendations
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => fetchVideos(query)}
            className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setQuery(category)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
            >
              {category}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;