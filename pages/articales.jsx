"use client";
import React, { useEffect, useState } from "react";

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/getArticales");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Articles</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Année</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Thème</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Titre</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">Résumé</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase">ID PDF</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr
                key={index}
                className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{article["Année"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article["Thème"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article["Titre"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article["résumé"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{article["idpdf"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
