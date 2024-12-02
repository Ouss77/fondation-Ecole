"use client";
import React, { useEffect, useState } from "react";

export default function AllActualites() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch actualites from API
    const fetchActualites = async () => {
      try {
        const response = await fetch("/api/actualites"); // Update this with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch actualites");
        }
        const data = await response.json();
        setActualites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 pt-60 ">
        <div className="">
        <h1 className="text-4xl text-yellow-600 font-bold  mb-8">Tous les actualités</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-black ">
              <th className="px-4 py-3 text-left  text-lg lg:text-2xl font-bold uppercase ">Title</th>
              <th className="px-4 py-3 text-left text-lg lg:text-2xl font-bold uppercase">Description</th>
            </tr>
          </thead>
          <tbody>
            {actualites.map((item, index) => (
              <tr
                key={index}
                className={`border-t hover:bg-gray-50  border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-3  lg:text-lg text-gray-700">{item.title}</td>
                <td className="px-4 py-3 lg:text-lg text-gray-700">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
     
    </div>
  );
}
