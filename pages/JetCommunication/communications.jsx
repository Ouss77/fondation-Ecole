import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ArticlesTable() {
  const pageTitle = "Articles Page";
  const pageDescription = "Description of the articles page";

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [hoveredTheme, setHoveredTheme] = useState({ id: null, name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      const cachedData = localStorage.getItem("cachedArticles");
      const cachedTimestamp = localStorage.getItem("cachedTimestamp");

      if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < 3600000) {
        setArticles(JSON.parse(cachedData));
        setFilteredArticles(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getArticles_locally.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
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
    const query = e.target.value;
    setSearchQuery(query);
    const filteredArticles = articles.filter(
      (article) =>
        article.titre.toLowerCase().includes(query.toLowerCase()) ||
        article.authors.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
  };

  const handleMouseEnter = async (themeID, article_id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getTheme.php?themeID=${themeID}`
      );
      const data = await response.json();
      setHoveredTheme({ id: themeID, article_id:article_id, name: data.themeName });
    } catch (error) {
      setHoveredTheme({ id: themeID, name: "Theme not found" });
    }
  };

  const handleMouseLeave = () => {
    setHoveredTheme({ id: null, name: "" });
  };

  const handleSort = (key) => {
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedArticles = [...filteredArticles].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredArticles(sortedArticles);
  };

  const toggleResume = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getFirstSentence = (text) => {
    const sentences = text.split(/(?<=[.!?])\s*/);
    return sentences[0] || text;
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://af3m-assoc.org/devenir-membre" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
      </Head>
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
          <a
            href={"/JetCommunication/articlesList"}
            className="bg-blue-500 text-white text-center w-40 px-4 py-2 rounded-lg ml-2 hover:bg-green-500"
          >
            View List
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg table-fixed">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-3 text-left text-sm font-medium uppercase cursor-pointer w-[80px]" onClick={() => handleSort("annee")}>
                  Annee
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase cursor-pointer hidden sm:table-cell" onClick={() => handleSort("theme")}>
                  Theme
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">
                  Titre
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase w-96 lg:w-[800px]">
                  Resume
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase w-[200px] hidden sm:table-cell">
                  Authors
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase w-[100px]">
                  PDF
                </th>
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
                    className="px-4 py-3 text-sm text-gray-700 hidden sm:table-cell relative cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(article.theme, article.article_id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {article.theme}
                    {hoveredTheme.id === article.theme && hoveredTheme.article_id === article.article_id &&(
                      <div className="absolute bg-blue-100 font-bold p-2 border text-xs w-32 -left-5  border-gray-300 shadow-lg rounded-lg z-10">
                        {hoveredTheme.name}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{article.titre}</td>
                  <td className="px-4 py-3 text-sm text-left text-gray-700">
                    <div className="sm:hidden w-44 lg:w-[800px]">{getFirstSentence(article.resume)}</div>
                    <div className="hidden sm:block">
                      {expandedRows[index] ? article.resume : article.resume.split("\n").slice(0, 3).join("\n")}
                      {article.resume.split("\n").length > 3 && (
                        <button
                          onClick={() => toggleResume(index)}
                          className="text-blue-500 hover:underline text-sm mt-2"
                        >
                          {expandedRows[index] ? "Read Less" : "...Read More"}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 hidden sm:table-cell">{article.authors}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <a
                      href={`http://localhost/AF3M-Backend/pdf_files/${article.pdf_files}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.pdf_files}
                    </a>
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
      </div>
    </>
  );
}