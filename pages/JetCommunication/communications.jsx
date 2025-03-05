import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/components/Context/LanguageContext";
import { fetchArticles, handleSearch, handleYearChange } from "@/utils/articleUtils";
import { handleSort } from "@/utils/articleUtils";

export default function ArticlesTable() {

  const { language } = useContext(LanguageContext);
  const pageTitle = "Articles Page";
  const pageDescription = "Description of the articles page";
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All"); // Nouvelle state
  const [hoveredTheme, setHoveredTheme] = useState({ id: null, name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [expandedRows, setExpandedRows] = useState({});


  useEffect(() => {
    fetchArticles(setArticles, setFilteredArticles, setLoading);
  }, []);


  const handleMouseEnter = async (themeID, article_id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getTheme.php?themeID=${themeID}`
      );
      const data = await response.json();
      console.log("Fetched Theme Data:", data); // Vérifie si les données sont bien récupérées

      setHoveredTheme({ id: themeID, article_id:article_id, name: data.themeName });
    } catch (error) {
      setHoveredTheme({ id: themeID, name: "Theme not found" });
    }
  };

  const handleMouseLeave = () => {
    setHoveredTheme({ id: null, name: "" });
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

  const years = [...new Set(articles.map(article => article.annee))].sort((a, b) => b - a);

  if (loading) {return <div className="text-center py-10">Loading...</div> }
  if (error) {return <div className="text-center text-red-600 py-10">Error: {error}</div>  }

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
        <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e, setSelectedYear, setFilteredArticles, articles)}
            className="px-4 py-2 mr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">{language=="fr" ? "Toutes les annees" : "All Years"}</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={language=="fr" ? "Rechercher par titre ou nom de l'auteur" : "Search by Title or Author Name"}
            value={searchQuery}
            onChange={(e) => handleSearch(e, articles, setSearchQuery, setFilteredArticles)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <a
            href={"/JetCommunication/articlesList"}
            className="bg-blue-500 text-white text-center w-40 px-4 py-2 rounded-lg ml-2 hover:bg-green-500"
          >
            {language === "fr" ? "Voir la liste" : "View List"}
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg table-fixed">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-3 text-left text-sm font-medium uppercase cursor-pointer w-[80px]" onClick={ () => handleSort("annee", sortConfig, setSortConfig, filteredArticles, setFilteredArticles)}>
                  Annee
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase cursor-pointer hidden sm:table-cell" onClick={ () => handleSort("theme", sortConfig, setSortConfig, filteredArticles, setFilteredArticles)}>
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
                        aria-label="Read More"
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
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/pdf_files/${article.pdf_files}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="border-2 p-2 bg-green-500 rounded-lg font-bold hover:bg-green-600">Download</button>
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