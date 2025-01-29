import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAbstract, setShowAbstract] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      // Check if data exists in localStorage
      const cachedData = localStorage.getItem("cachedArticles");
      const cachedTimestamp = localStorage.getItem("cachedTimestamp");

      // If data is cached and not older than 1 hour, use it
      if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < 3600000) {
        setArticles(JSON.parse(cachedData));
        setFilteredArticles(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // Fetch fresh data from the API
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getArticles_locally.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);

        // Cache the data in localStorage
        localStorage.setItem("cachedArticles", JSON.stringify(data));
        localStorage.setItem("cachedTimestamp", Date.now());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = articles.filter(
      (article) =>
        article.titre.toLowerCase().includes(value) ||
        (article.authors && article.authors.toLowerCase().includes(value))
    );

    setFilteredArticles(filtered);
  };

  const toggleAbstract = (index) => {
    setShowAbstract((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Articles</h1>

      {/* Search Bar and Button */}
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Search by Title or Author Name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-auto flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          href={"/JetCommunication/communications"}
          className="w-full sm:w-40 text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 transition-colors"
        >
          View Table
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-200 transition duration-300"
          >
            <h2 className="text-lg font-bold">{article.titre}</h2>
            <p className="text-sm text-gray-600">Authors: {article.authors}</p>
            <p className="text-sm text-gray-600">Year: {article.annee}</p>
            <p className="text-sm text-gray-600">Theme: {article.theme}</p>

            {/* Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => toggleAbstract(index)}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 hover:bg-blue-600"
              >
                {showAbstract[index] ? "Hide Abstract" : "Show Abstract"}
              </button>
              <a
                href={`http://localhost/AF3M-Backend/pdf_files/${article.pdf_files}`}
                // href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/pdf_files/${article.pdf_files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-white bg-green-600 rounded-lg focus:outline-none focus:ring-2 hover:bg-green-700 text-center"
              >
                Download Article
              </a>
            </div>

            {/* Abstract */}
            {showAbstract[index] && (
              <p className="mt-4 text-sm text-gray-700">{article.resume}</p>
            )}
          </div>
        ))}
      </div>

      {/* No Articles Found */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No articles found.
        </div>
      )}
    </div>
  );
}