    // components/ArticlesTable.js
import React from "react";

const ArticlesTable = ({ filteredArticles, searchQuery, handleSearch }) => {
  return (
    <div className="container w-11/12  mx-auto px-4 py-10 pt-32">
      <h1 className="text-3xl font-bold text-yellow-600 mb-8">Articles</h1>

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
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left text-lg font-bold  border-r">Titre</th>
              <th className="px-4 py-3 text-left text-lg font-bold  border-r">Authors</th>
              <th className="px-4 py-3 text-left text-lg font-bold  border-r">Annee</th>
              <th className="px-4 py-3 text-left text-lg font-bold  border-r">Theme</th>
              <th className="px-4 py-3 text-left text-lg font-bold  border-r">Resume</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, index) => (
              <tr
                key={index}
                className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{article.titre}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{article.authors}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{article.annee}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{article.theme}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{article.resume}</td>
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
};

export default ArticlesTable;
