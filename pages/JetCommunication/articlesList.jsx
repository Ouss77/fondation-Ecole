import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/components/Context/LanguageContext";
import { fetchArticles, handleSearch, handleYearChange } from "@/utils/articleUtils";

export default function ArticlesTable() {

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAbstract, setShowAbstract] = useState({});
  const [selectedYear, setSelectedYear] = useState("All"); // Nouvelle state
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchArticles(setArticles, setFilteredArticles, setLoading, setError );
  }, []);


  const toggleAbstract = (index) => {
    setShowAbstract((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const years = [...new Set(articles.map(article => article.annee))].sort((a, b) => b - a);

  if (loading) {return <div className="text-center py-10">Loading...</div>;}
  if (error) { return <div className="text-center text-red-600 py-10">Error: {error}</div>;}

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Articles</h1>

      {/* Search Bar and Button */}
      <div className="mb-4 flex items-center">
        <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e, setSelectedYear, setFilteredArticles, articles)}
            className="px-4 py-2 mr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by Title or Author Name"
            value={searchQuery}
            onChange={(e) => handleSearch(e, articles, setSearchQuery, setFilteredArticles)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <a
            href={"/JetCommunication/communications"}
            className="bg-blue-500 text-white text-center w-40 px-4 py-2 rounded-lg ml-2 hover:bg-green-500"
          >
            {language === "fr" ? "Voir Articles" : "View Articles"} 
          </a>
        </div>

      {/* Articles Grid */}
      <div className=" ">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-5  border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-200 transition duration-300"
          >
            <div className="overflow-hidden">
            <h2 className="text-lg font-bold">{article.titre}</h2>
            <p className="text-sm text-gray-600">Authors: {article.authors}</p>
            <p className="text-sm text-gray-600">Year: {article.annee}</p>
            <p className="text-sm text-gray-600">Theme: {article.theme}</p>
            </div>
   

            {/* Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
              aria-label="Show Abstract"
                onClick={() => toggleAbstract(index)}
                className="h-full px-2 text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 hover:bg-blue-600"
              >
                {showAbstract[index] ? "Hide Abstract" : "Show Abstract"}
              </button>
              <a
                href={`http://localhost/AF3M-Backend/pdf_files/${article.pdf_files}`}
                // href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/pdf_files/${article.pdf_files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 h-full text-white bg-green-600 rounded-lg focus:outline-none focus:ring-2 hover:bg-green-700 text-center"
              >
               {language === "fr" ? "Télécharger" : "Download"}
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