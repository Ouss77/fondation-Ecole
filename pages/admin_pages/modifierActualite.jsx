"use client";
import { LanguageContext } from '@/components/Context/LanguageContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";

export default function ModifierActualite() {
  const language = useContext(LanguageContext);
  const [actualites, setActualites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredActualites, setFilteredActualites] = useState([]);
  const [message, setMessage] = useState("");

  const fetchActualites = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getActualite.php`);
      const data = response.data;
      setActualites(data);
      setFilteredActualites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActualites();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteActualite.php?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      if (result.success) {
        setMessage("Actualité supprimée avec succès !");
        fetchActualites();
      } else {
        setMessage("Erreur: Impossible de supprimer l'actualité.");
      }
    } catch (err) {
      setMessage("Erreur: " + err.message);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = actualites.filter(
      (actualite) =>
        actualite.title.toLowerCase().includes(value) ||
        (actualite.description && actualite.description.toLowerCase().includes(value))
    );
    setFilteredActualites(filtered);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {language === "fr" ? "Toutes les actualités" : "All the News"}
      </h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder={language === "fr" ? "Rechercher par titre" : "Search by title"}
          value={searchQuery}
          onChange={handleSearch}
          className="w-3/4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => (window.location.href = "/admin_pages/ajouterActualite")}
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {language === "fr" ? "Ajouter Actualité" : "Add News"}
        </button>
      </div>

      {message && <div className="mb-4 p-2 text-center text-white bg-green-500 rounded">{message}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-lg font-bold">Image</th>
              <th className="px-4 py-3 text-left text-lg font-bold">Title</th>
              <th className="px-4 py-3 text-left text-lg font-bold">Description</th>
              <th className="px-4 py-3 text-left text-lg font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredActualites.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  {item.image_url && <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image_url}`} alt="News" className="w-40 h-32 object-cover rounded" />}
                </td>
                <td className="px-4 py-3">{item.title_fr}</td>
                <td className="px-4 py-3">{item.description_fr}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
