"use client";
import React, { useState, useEffect } from "react";

export default function AddArticleForm() {
  const [authors, setAuthors] = useState([]); // Existing authors
  const [selectedAuthorId, setSelectedAuthorId] = useState(""); // Selected author
  const [newAuthorName, setNewAuthorName] = useState(""); // New author input
  const [articleData, setArticleData] = useState({
    titre: "",
    annee: "",
    theme: "",
    resume: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Fetch existing authors when component mounts
    const fetchAuthors = async () => {
      try {
        const response = await fetch("/api/get_authors.php");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...articleData,
        selectedAuthorId,
        newAuthorName,
      };

      // Submit the form data to the backend
      const response = await fetch("/api/ajouter_article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Article added successfully!");
        setArticleData({ titre: "", annee: "", theme: "", resume: "" });
        setSelectedAuthorId("");
        setNewAuthorName("");
      } else {
        console.error("Failed to add article:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Article</h1>

      {successMessage && (
        <div className="text-green-600 text-center mb-4">{successMessage}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 border rounded-lg shadow"
      >
        <div className="mb-4">
          <label className="block font-medium mb-2">Titre</label>
          <input
            type="text"
            name="titre"
            value={articleData.titre}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Annee</label>
          <input
            type="number"
            name="annee"
            value={articleData.annee}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Theme</label>
          <input
            type="text"
            name="theme"
            value={articleData.theme}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Resume</label>
          <textarea
            name="resume"
            value={articleData.resume}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        {/* Author Selection */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Author</label>
          <select
            value={selectedAuthorId}
            onChange={(e) => setSelectedAuthorId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Existing Author</option>
            {authors.map((author) => (
              <option key={author.author_id} value={author.author_id}>
                {author.author_name}
              </option>
            ))}
          </select>
        </div>

        {/* Add New Author */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Or Add New Author</label>
          <input
            type="text"
            placeholder="New Author Name"
            value={newAuthorName}
            onChange={(e) => setNewAuthorName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Article
        </button>
      </form>
    </div>
  );
}
