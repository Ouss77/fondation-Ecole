"use client";
import React, { useEffect, useState } from "react";

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]); // All articles from API
  const [filteredArticles, setFilteredArticles] = useState([]); // Filtered articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articales.php");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data); // Save the full data
        setFilteredArticles(data); // Initialize the filtered state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Convert input to lowercase
    setSearchQuery(value);

    // Filter the articles based on 'titre' or 'authors'
    const filtered = articles.filter(
      (article) =>
        article.titre.toLowerCase().includes(value) || // Search in 'titre'
        (article.authors && article.authors.toLowerCase().includes(value)) // Search in 'authors'
    );

    setFilteredArticles(filtered); // Update filtered data
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Articles</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Title or Author Name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Titre</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Annee</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Theme</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Resume</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Authors</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, index) => (
              <tr
                key={index}
                className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{article.titre}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article.annee}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article.theme}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article.resume}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article.authors}</td>
              </tr>
            ))}
            {filteredArticles.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
