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
      try {
        const response = await fetch("http://localhost/AF3M-Backend/getArticles_locally.php");

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
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
    <div className="container mx-auto px-40 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Articles</h1>

       <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by Title or Author Name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link href={"/JetCommunication/communications"} className="bg-blue-500 text-white text-center w-40 px-4 py-2 rounded-lg ml-2 hover:bg-green-500">
          View Table
        </Link>
      </div>

      <div>
        {filteredArticles.map((article, index) => (
          <div key={index} className="bg-white p-4 mb-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-200 transition duration-300">
            <h2 className="text-lg font-bold">{article.titre}</h2>
            <p className="text-sm text-gray-600">Authors: {article.authors}</p>
            <p className="text-sm text-gray-600">Year: {article.annee}</p>
            <p className="text-sm text-gray-600">Theme: {article.theme}</p>
            <button
              onClick={() => toggleAbstract(index)}
              className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              {showAbstract[index] ? "Hide Abstract" : "Show Abstract"}
            </button>
            <button
              className="mt-2 px-4 py-2 ml-5 text-white bg-green-600 rounded-lg focus:outline-none focus:ring-2  hover:bg-green-700"
            >
              Download Article
            </button>
            
            {showAbstract[index] && (
              <p className="mt-4 text-sm text-gray-700">{article.resume}</p>
            )}
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
}
