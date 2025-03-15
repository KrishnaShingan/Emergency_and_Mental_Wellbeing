import { useEffect, useState } from "react";
import { getUserNews, fetchNews, saveArticle, deleteArticle } from "../../api";

const News = ({ username }) => {  // ✅ Accept username as a prop
    const [news, setNews] = useState([]);
    const [savedNews, setSavedNews] = useState([]);
    const [query, setQuery] = useState("Mental Health");
    const [viewSaved, setViewSaved] = useState(false);

    useEffect(() => {
        if (username) {
            loadUserNews(); // ✅ Load saved news only if username exists
        }
    }, [username]);

    const loadNews = async () => {
        const articles = await fetchNews(query);
        console.log("✅ Processed News Articles:", articles);

        if (Array.isArray(articles)) {
            setNews(articles);
        } else {
            console.error("⚠️ API response is not an array:", articles);
            setNews([]); // Prevent map error
        }
    };

    const loadUserNews = async () => {
        if (!username) {
            console.error("❌ Error: Username is undefined.");
            return;
        }

        const savedArticles = await getUserNews(username); // ✅ Pass username to API
        if (Array.isArray(savedArticles)) {
            setSavedNews(savedArticles);
        } else {
            console.error("⚠️ Saved news is not an array:", savedArticles);
            setSavedNews([]);
        }
    };

    const handleSaveArticle = async (article) => {
        if (!username) {
            console.error("❌ Error: Username is undefined.");
            return;
        }
        await saveArticle({ ...article, username }); // ✅ Attach username to the article
        loadUserNews(); // ✅ Refresh saved news after saving
    };

    const handleDeleteArticle = async (article) => {
        try {
            if (!article.id) {
                console.error("❌ Error: Article ID is missing.");
                return;
            }
    
            await deleteArticle(article.id);
            console.log("✅ Article deleted successfully!");
            loadUserNews();
        } catch (error) {
            console.error("❌ Error deleting article:", error);
        }
    };
    
    
    

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">News</h1>

            {viewSaved && (
                <button
                    onClick={() => setViewSaved(false)}
                    className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                    🔙 Back
                </button>
            )}

            {!viewSaved ? (
                <>
                    <div className="flex justify-center gap-3 mb-4">
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="border p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            onClick={loadNews} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Fetch News
                        </button>
                        <button 
                            onClick={() => setViewSaved(true)} 
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            View Saved News
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">Fetched News</h2>
                    {news.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {news.map((article, index) => (
                                <div key={article.url || index} className="p-4 border rounded-lg shadow-md bg-white">
                                    {article.urlToImage && (
                                        <img src={article.urlToImage} alt="News" className="w-full h-40 object-cover rounded-lg mb-2" />
                                    )}
                                    <h3 className="font-bold text-lg">{article.title || "No Title Available"}</h3>
                                    <p className="text-gray-600">{article.description || "No description available."}</p>
                                    {article.url && (
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            Read More
                                        </a>
                                    )}
                                    <button 
                                        onClick={() => handleSaveArticle(article)} 
                                        className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No news articles available.</p>
                    )}
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Saved News</h2>
                    {savedNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {savedNews.map((article, index) => (
                                <div key={article.id || article.url || index} className="p-4 border rounded-lg shadow-md bg-gray-100">
                                    <h3 className="font-bold text-lg">{article.title}</h3>
                                    <button 
                                        onClick={() => handleDeleteArticle(article)} 
                                        className="mt-2 bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No saved news.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default News;
