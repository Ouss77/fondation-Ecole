"use client";
import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";
import { fetchArticles, handleSearch } from "@/utils/articleUtils";

export default function ModifierArticle() {
  const [articles, setArticles] = useState([]); // All articles from API
  const [filteredArticles, setFilteredArticles] = useState([]); // Filtered articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [activeResume, setActiveResume] = useState(null); // Track active resume to toggle visibility

  useEffect(() => {
    fetchArticles(setArticles, setFilteredArticles, setLoading);
  }, []);

  const handleDelete = async (articleId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteArticles.php?article_id=${articleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      // Show success message and refresh the page
      alert("Article deleted successfully");
      window.location.reload(); // Refresh the page
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="mx-auto min-w-full px-4 py-10 ml-2">
      <h1 className="text-3xl font-bold text-center mb-8">Articles</h1>

      {/* Search Input and Add Article Button */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Title or Author Name"
          value={searchQuery}
          onChange={(e) =>
            handleSearch(e, articles, setSearchQuery, setFilteredArticles)
          }
          className="search-bar w-3/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          aria-label="Add Article"
          onClick={() => (window.location.href = "/admin_pages/ajouterArticle")}
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-700"
        >
          Ajouter Article
        </button>
      </div>

      {/* Table for Desktop */}
      <div className="overflow-x-auto min-w-full table-container hidden md:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left text-sm font-medium uppercase border-r">
                Annee
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase border-r">
                Theme
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase border-r">
                Titre
              </th>

              <th className="px-4 py-0 text-left text-sm font-medium uppercase border-r">
                Resume
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase border-r">
                Authors
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, index) => (
              <tr
                key={article.id}
                className={`border-t border-gray-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-700 border-r">
                  {article.annee}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">
                  {article.theme}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">
                  {article.titre}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700 border-r">
                  {article.resume}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">
                  {article.authors}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <button
                    aria-label="Edit Article"
                    onClick={() => handleDelete(article.article_id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredArticles.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-md"
          >
            <h2 className="font-bold text-lg">{article.titre}</h2>
            <p className="text-sm text-gray-600">Annee: {article.annee}</p>
            <p className="text-sm text-gray-600">Theme: {article.theme}</p>
            <p className="text-sm text-gray-600">Authors: {article.authors}</p>

            {/* Resume Toggle Button */}
            <div className="mt-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  setActiveResume(activeResume === article.id ? null : article.id)
                }
              >
                {activeResume === article.id ? "Hide Resume" : "Show Resume"}
              </button>

              {activeResume === article.id && (  
                <p className="mt-2 text-sm text-gray-700">{article.resume}</p>
              )}
            </div> 

            {/* Delete Button */}
            <button
              aria-label="Delete Article"
              onClick={() => handleDelete(article.article_id)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <div className="col-span-full text-center py-4 text-gray-500">
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
}
