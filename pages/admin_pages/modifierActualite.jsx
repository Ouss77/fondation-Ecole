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
  const [message, setMessage] = useState(""); // Message state to show success or error

  const fetchActualites = async () => {
    try {
      const response = await axios.get("http://localhost/AF3M-Backend/getActualite.php");
      const data = response.data;
      setActualites(data);
      setFilteredActualites(data); // Initialize filtered list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchActualites(); // Fetch the data when the component is mounted
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleDelete = async (titre) => {
    try {
      const response = await fetch(
        `http://localhost/AF3M-Backend/deleteActualite.php?Titre=${encodeURIComponent(
          titre
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete actualite");
      }

      const result = await response.json();
      if (result.success) {
        // Show success message
        setMessage("Actualite deleted successfully!");

        // Refetch the data after deletion
        fetchActualites(); // This will fetch the updated list
      } else {
        console.error(result.error);
        setMessage("Error: Failed to delete the actualite.");
      }
    } catch (err) {
      console.error(err.message);
      setMessage("Error: " + err.message);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = actualites.filter(
      (actualite) =>
        actualite.Titre.toLowerCase().includes(value) ||
        (actualite.Description &&
          actualite.Description.toLowerCase().includes(value))
    );
    setFilteredActualites(filtered);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="container w-full  mx-auto px-4 py-10">
      <h1 className="text-3xl text-black-600 text-center font-bold mb-8">
        {language =="fr" ? "Toutes les actualite": "All the News"}
        Actualités
      </h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Title or Author Name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-3/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() =>
            (window.location.href = "/admin_pages/ajouterActualite")
          }
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-700"
        >
          Ajouter Actualite
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className="mb-4 p-2 text-center text-white bg-green-500 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-4 py-3 text-left text-lg lg:text-xl font-bold uppercase">
                Image
              </th>

              <th className="px-4 py-3 text-left text-lg lg:text-xl font-bold uppercase">
                Title
              </th>
              <th className="px-4 py-3 text-left text-lg lg:text-xl font-bold uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-lg lg:text-xl font-bold uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredActualites.map((item, index) => (
              <tr
                key={index}
                className={`border-t hover:bg-gray-50 border-gray-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 lg:text-base text-gray-700">
                  {item.image_url && (
                    <img
                      src={`http://192.168.1.21/AF3M-Backend/${item.image_url}`}
                      alt="Actualité Image"
                      className="w-40 h-32 object-cover mb-4 rounded"
                    />
                  )}
                </td>

                <td className="px-4 py-3 lg:text-base text-gray-700">
                  {item.Titre}
                </td>
                <td className="px-4 py-3 lg:text-base text-gray-700">
                  {item.Description}
                </td>
                <td className="px-4 py-3 lg:text-base text-gray-700">
                  <button
                    onClick={() => handleDelete(item.Titre)}
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
