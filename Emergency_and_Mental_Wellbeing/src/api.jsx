import axios from "axios";

const API_URL = "http://localhost:8080";

// ✅ Register User API
export const registerUser = async ({ firstName, lastName, email, password }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { firstName, lastName, email, password });
        console.log("✅ Registration successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Registration error:", error.response?.data || error.message);
        return null;
    }
};

// ✅ Login User API
export const loginUser = async ({ email, password }) => {
    try {
        console.log("🔹 Logging in user:", email);
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });

        if (response.data?.username) {
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("username", response.data.username);  // ✅ Store username
            console.log("✅ Login successful. Stored username:", response.data.username);
        } else {
            console.error("❌ Login failed. No username returned.");
        }

        return response.data;
    } catch (error) {
        console.error("❌ Login error:", error.response?.data || error.message);
        return null;
    }
};


// ✅ Logout Function
export const logoutUser = () => {
    console.log("🔴 Logging out user...");
    localStorage.removeItem("username");  // ✅ Remove stored username on logout
};

// ✅ Submit Mental Health Assessment API
export const getAssessmentHistory = async (username) => {
    try {
        console.log("📜 Fetching history for:", username);
        const response = await axios.get(`${API_URL}/api/assessment/history`, { params: { username } });

        if (!response.data || response.data.length === 0) {
            console.log("⚠️ No history found for", username);
            return [];  // ✅ Ensure it returns an empty array
        } else {
            console.log("✅ History retrieved:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("❌ Error fetching history:", error.response?.data || error.message);
        return [];
    }
};

export const submitAssessment = async ({ username, responses }) => {
    try {
        console.log("📝 Storing assessment for:", username);

        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("❌ No auth token found! User may not be authenticated.");
            return null;
        }

        // ✅ Ensure responses is an array
        const formattedResponses = Array.isArray(responses) ? responses : Object.values(responses);

        const response = await axios.post(
            `${API_URL}/api/assessment`,
            { username, responses: formattedResponses }, // ✅ Ensure correct format
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("✅ Assessment stored successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error storing assessment:", error.response?.data || error.message);
        return null;
    }
};

export const sendMessage = async (message) => {
    try {
        console.log("📤 Sending message:", message);
        const response = await axios.post("http://localhost:8080/chatbot/send", 
            { message }, 
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Chatbot response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Chatbot API error:", error.response?.data || error.message);
        return "Error: Chatbot did not respond.";
    }
};

// ✅ Fetch YouTube Videos API
export const fetchVideos = async (query) => {
    try {
        console.log("🔍 Fetching videos for:", query);
        const response = await axios.get(`${API_URL}/api/videos/${query}`);

        if (response.data.items) {
            console.log("✅ Videos retrieved:", response.data.items);
            return response.data.items;  // ✅ Return video list
        } else {
            console.warn("⚠️ No videos found for query:", query);
            return [];
        }
    } catch (error) {
        console.error("❌ Error fetching videos:", error.response?.data || error.message);
        return [];
    }
};


// ✅ Fetch News from API
export const fetchNews = async (query) => {
    try {
        const token = localStorage.getItem("authToken"); // ✅ Retrieve stored token

        if (!token) {
            console.error("❌ No auth token found!");
            return [];
        }

        const response = await axios.get(`${API_URL}/news/fetch`, {
            params: { query },
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Ensure the token is sent
                "Content-Type": "application/json",
            },
        });

        console.log("🔍 API Response:", response.data);

        const articles = response.data.articles || response.data || [];
        return Array.isArray(articles) ? articles : [];
    } catch (error) {
        console.error("❌ Error fetching news:", error.response?.data || error.message);
        return [];
    }
};


// ✅ Save Article for Logged-in User
export const saveArticle = async (article) => {
    const token = localStorage.getItem("authToken"); // ✅ Get token
    if (!token) {
        console.error("❌ No auth token found");
        return;
    }

    try {
        await axios.post(`${API_URL}/news/save`, article, {
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Send JWT token
                "Content-Type": "application/json",
            },
        });
        console.log("✅ Article saved successfully!");
    } catch (error) {
        console.error("❌ Error saving article:", error.response?.data || error.message);
    }
};

// ✅ Get Saved News for Logged-in User
export const getUserNews = async () => {
    try {
        const token = localStorage.getItem("authToken"); // ✅ Fetch JWT token

        if (!token) {
            console.error("❌ No auth token found! User may not be authenticated.");
            return [];
        }

        const response = await axios.get(`${API_URL}/news/user`, {
            headers: {
                Authorization: `Bearer ${token}`,  // ✅ Send JWT token
                "Content-Type": "application/json",
            },
        });

        console.log("✅ Fetched saved news:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching saved news:", error.response?.data || error.message);
        return [];
    }
};

// ✅ Delete an Article for Logged-in User
export const deleteArticle = async (articleId) => {
    try {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("❌ No auth token found! Please log in.");
            return;
        }

        const response = await axios.delete(`${API_URL}/news/delete/${encodeURIComponent(articleId)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        console.log("✅ Article deleted successfully!", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting article:", error.response?.data || error.message);
    }
};



export const fetchTasks = async (username) => {
    if (!username) {
        console.error("❌ Username is undefined while fetching tasks.");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/api/tasks/${username}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching tasks:", error.response?.data || error.message);
        return [];
    }
};


// ✅ Add Task for a Specific User
export const addTask = async (username, task) => {
    try {
        await axios.post(`${API_URL}/api/tasks/${username}`, task, { withCredentials: true });
    } catch (error) {
        console.error("❌ Error adding task:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete Task for a Specific User
export const deleteTask = async (username, id) => {
    try {
        await axios.delete(`${API_URL}/api/tasks/${username}/${id}`, { withCredentials: true });
    } catch (error) {
        console.error("❌ Error deleting task:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Update Task for a Specific User
export const updateTask = async (username, id, updatedTask) => {
    try {
        await axios.put(`${API_URL}/api/tasks/${username}/${id}`, updatedTask, { withCredentials: true });
    } catch (error) {
        console.error("❌ Error updating task:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Fetch Mood Entries for Logged-in User
export const fetchMoodHistory = async (username) => {
    try {
        const token = localStorage.getItem("authToken"); // ✅ Fetch stored JWT token
        if (!token) {
            console.error("❌ No auth token found! User may not be authenticated.");
            return [];
        }

        const response = await axios.get(`http://localhost:8080/mood/history`, {
            params: { username },
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Ensure the token is sent
                "Content-Type": "application/json",
            },
        });

        console.log("✅ Mood history retrieved:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching mood history:", error.response?.data || error.message);
        return [];
    }
};


// ✅ Submit Mood Entry (Only One Entry per Day)
export const submitMood = async ({ username, mood, description, sleep, water, date }) => {
    if (!username) {
        console.error("❌ Cannot submit mood without a username.");
        return null;
    }
    try {
        const response = await axios.post(`${API_URL}/mood/save`, {
            username,
            mood,
            description,
            sleep,
            water,
            date,
        });
        console.log("✅ Mood entry stored successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error storing mood entry:", error.response?.data || error.message);
        return null;
    }
};

// ✅ Update Mood Entry for a Given Date
export const updateMood = async ({ id, username, mood, description, sleep, water, date }) => {
    if (!id || !username) {
        console.error("❌ Mood ID and username are required for updating mood entry.");
        return null;
    }
    try {
        const response = await axios.put(`${API_URL}/mood/update/${id}`, {
            username,
            mood,
            description,
            sleep,
            water,
            date,
        });
        console.log("✅ Mood entry updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating mood entry:", error.response?.data || error.message);
        return null;
    }
};

// ✅ Delete Mood Entry for a Given Date
export const deleteMood = async (id) => {
    if (!id) {
        console.error("❌ Mood ID is required to delete mood entry.");
        return null;
    }
    try {
        const response = await axios.delete(`${API_URL}/mood/delete/${id}`);
        console.log("✅ Mood entry deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting mood entry:", error.response?.data || error.message);
        return null;
    }
};