// pages/articles.js
"use client";
import React, { useEffect, useState } from "react";
import ArticlesTable from "../src/components/ArticlesTable"; // Import the table component

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]); // All articles from API
  const [filteredArticles, setFilteredArticles] = useState([]); // Filtered articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articales.php"); // Replace with your actual API endpoint
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
    <ArticlesTable
      filteredArticles={filteredArticles}
      searchQuery={searchQuery}
      handleSearch={handleSearch}
    />
  );
};

export default ArticlesPage;
