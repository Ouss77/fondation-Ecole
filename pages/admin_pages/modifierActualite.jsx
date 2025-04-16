"use client";
import { LanguageContext } from '@/components/Context/LanguageContext';
import Loading from '@/components/Loading';
import React, { useContext, useEffect, useState } from "react";
import { fetchActualites } from '@/utils/actualitesUtils';

export default function ModifierActualite() {
  const language = useContext(LanguageContext);
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [visibleDescription, setVisibleDescription] = useState(null);

  const toggleDescription = (id) => {
    setVisibleDescription(visibleDescription === id ? null : id);
  };


  useEffect(() => {
    fetchActualites( setActualites, setLoading, setError);
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

  if (loading) return <div className='ml-20'><Loading/></div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
<div className="container mx-auto px-4 py-10">
  <h1 className="text-3xl font-bold text-center mb-8">
    {language === "fr" ? "Toutes les actualités" : "All the News"}
  </h1>

  <div className="flex justify-between mb-4 ml-4">
    <button
      aria-label="Add News"
      onClick={() => (window.location.href = "/admin_pages/ajouterActualite")}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
    >
      {language === "fr" ? "Ajouter Actualité" : "Add News"}
    </button>
  </div>

  {message && <div className="mb-4 p-2 text-center text-white bg-green-500 rounded">{message}</div>}

  <div className="space-y-6">
    {actualites.map((item) => (
      <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-4">
        {item.image_url && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image_url}`}
            alt="News"
            className="w-full lg:w-40 h-32 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{item.title_fr}</h2>
              {/* Paragraph is always visible on desktop but toggleable on mobile */}
              <p className={`text-gray-700 mt-2 sm:block ${visibleDescription === item.id ? "block" : "hidden"}`}>
                {item.description_fr}
              </p>

              {/* Toggle button for mobile view only */}
              <button
                aria-label="Toggle Description"
                onClick={() => toggleDescription(item.id)}
                className="mt-2 text-blue-500 sm:hidden"
              >
                {visibleDescription === item.id ? "▲ Hide" : "▼ Read More"}
              </button>        </div>
        <button
          aria-label="Delete News"
          onClick={() => handleDelete(item.id)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>


  );
}
