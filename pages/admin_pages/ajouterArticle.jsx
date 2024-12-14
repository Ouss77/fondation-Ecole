"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ajouterArticle() {
  const [formData, setFormData] = useState({
    titre: "",
    annee: "",
    theme: "",
    resume: "",
    author_name: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  
  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ajouter_article.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Article and Author added successfully!");
        setFormData({ titre: "", annee: "", theme: "", resume: "", author_name: "" });
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="pt-14 w-96 ml-72">
    <div className="container mx-auto  p-8  border  bg-white rounded-2xl shadow-lg shadow-indigo-400/50">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Article</h1>

      {successMessage && (
        <div className="text-green-600 text-center mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Annee</label>
          <input
            type="number"
            name="annee"
            value={formData.annee}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Theme</label>
          <input
            type="number"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Résumé</label>
          <textarea
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author Name</label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    

  );
}
