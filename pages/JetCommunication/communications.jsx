import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ArticlesTable() {
  
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [hoveredTheme, setHoveredTheme] = useState({ id: null, name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
    const query = e.target.value;
    setSearchQuery(query);
    const filteredArticles = articles.filter(
      (article) =>
        article.titre.toLowerCase().includes(query.toLowerCase()) ||
        article.authors.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
  };

  const handleMouseEnter = async (themeID) => {
    try {
      const response = await fetch(`http://localhost/AF3M-Backend/getTheme.php?themeID=${themeID}`);
      const data = await response.json();
      setHoveredTheme({ id: themeID, name: data.themeName });
    } catch (error) {
      setHoveredTheme({ id: themeID, name: "Theme not found" });
    }
  };

  const handleMouseLeave = () => {
    setHoveredTheme({ id: null, name: "" });
  };

  const handleSort = (key) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedArticles = [...filteredArticles].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredArticles(sortedArticles);
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
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by Title or Author Name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link href={"/JetCommunication/articlesList"} className="bg-blue-500 text-white text-center w-40 px-4 py-2 rounded-lg ml-2 hover:bg-green-500">
          View List
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th
                className="px-4 py-3 text-left text-sm font-medium uppercase cursor-pointer"
                onClick={() => handleSort('annee')}
              >
                Annee
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium uppercase cursor-pointer"
                onClick={() => handleSort('theme')}
              >
                Theme
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Titre</th>
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
                <td className="px-4 py-3 text-sm text-gray-700">{article.annee}</td>
                <td
                  className="px-4 py-3 text-sm text-gray-700 relative"
                  onMouseEnter={() => handleMouseEnter(article.theme)}
                  onMouseLeave={handleMouseLeave}
                >
                  {article.theme}
                  {hoveredTheme.id === article.theme && (
                    <div className="absolute -left-10 ml-2 w-44 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-999">
                      {hoveredTheme.name}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{article.titre}</td>
                <td className="px-4 py-3 text-sm text-justify text-gray-700">{article.resume}</td>
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
