import { useEffect, useState } from "react";
import { getUserNews, fetchNews, saveArticle, deleteArticle } from "../../api";

const News = ({ username }) => {
    const [news, setNews] = useState([]);
    const [savedNews, setSavedNews] = useState([]);
    const [query, setQuery] = useState("Mental Health");
    const [viewSaved, setViewSaved] = useState(false);

    useEffect(() => {
        if (username) loadUserNews();
    }, [username]);

    const loadNews = async () => {
        const articles = await fetchNews(query);
        if (Array.isArray(articles)) setNews(articles);
        else setNews([]);
    };

    const loadUserNews = async () => {
        if (!username) return;
        const savedArticles = await getUserNews(username);
        if (Array.isArray(savedArticles)) setSavedNews(savedArticles);
        else setSavedNews([]);
    };

    const handleSaveArticle = async (article) => {
        if (!username) return;
        await saveArticle({ ...article, username });
        loadUserNews();
    };

    const handleDeleteArticle = async (article) => {
        if (!article.id) return;
        await deleteArticle(article.id);
        loadUserNews();
    };

    const isArticleSaved = (article) => savedNews.some(saved => saved.url === article.url);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
                    Mental Wellbeing News
                </h1>

                {viewSaved && (
                    <button
                        onClick={() => setViewSaved(false)}
                        className="mb-6 flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                    >
                        <span>←</span> Back to News
                    </button>
                )}

                {!viewSaved ? (
                    <>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
                            <input
                                type="text"
                                placeholder="Search mental health topics..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button
                                onClick={loadNews}
                                className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
                            >
                                Search
                            </button>
                            <button
                                onClick={() => setViewSaved(true)}
                                className="w-full sm:w-auto bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition duration-200"
                            >
                                View Saved
                            </button>
                        </div>

                        <h2 className="text-2xl font-medium text-gray-700 mb-6">Latest News</h2>
                        {news.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.map((article, index) => (
                                    <div
                                        key={article.url || index}
                                        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200"
                                    >
                                        {article.urlToImage && (
                                            <img
                                                src={article.urlToImage}
                                                alt={article.title}
                                                className="w-full h-40 object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {article.title || "No Title Available"}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {article.description || "No description available."}
                                        </p>
                                        {article.url && (
                                            <a
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-600 hover:underline text-sm"
                                            >
                                                Read More
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleSaveArticle(article)}
                                            className={`mt-4 w-full py-2 rounded-md text-white text-sm font-medium transition duration-200 ${
                                                isArticleSaved(article)
                                                    ? "bg-green-500 hover:bg-green-600 cursor-not-allowed"
                                                    : "bg-teal-600 hover:bg-teal-700"
                                            }`}
                                            disabled={isArticleSaved(article)}
                                        >
                                            {isArticleSaved(article) ? "Saved" : "Save"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center">No news articles available.</p>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-medium text-gray-700 mb-6">Saved Articles</h2>
                        {savedNews.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedNews.map((article, index) => (
                                    <div
                                        key={article.id || article.url || index}
                                        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <button
                                            onClick={() => handleDeleteArticle(article)}
                                            className="mt-4 w-full py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center">No saved articles yet.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default News;