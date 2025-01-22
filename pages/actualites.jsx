"use client";
import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/components/Context/LanguageContext";
import Head from "next/head";
export default function AllActualites() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {language} = useContext(LanguageContext);
  console.log(language)
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch("http://192.168.1.21/AF3M-Backend/getActualite.php");
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
    <>
          <Head>
        <title>All News - AF3M</title>
        <meta
          name="description"
          content="Explore all the latest news and updates from the Franco-Maghreb Association of Mechanics and Materials."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="All News - AF3M" />
        <meta
          property="og:description"
          content="Discover the most recent articles, events, and activities related to AF3M."
        />
        <meta property="og:image" content="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
        <meta property="og:url" content="https://af3m-assoc.org/all-news" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
      </Head>
      <div className="container w-10/12 mx-auto px-4 py-10 pt-40">
      <h1 className="text-3xl text-yellow-600 font-bold mb-8"> 
         {language =="fr" ? "Toutes les actualite" : "All the News"}  </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actualites.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Display the image if it exists */}
            {item.image_url && (
              <img
                src={`http://192.168.1.21/AF3M-Backend/${item.image_url}`}
                alt="Actualité Image"
                className="w-full h-52 object-cover mb-4 rounded"
              />
            )}
 
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{item.Titre}</h2>
            <p className="text-gray-700 text-base">{item.Description}</p>
          </div>
        ))}
      </div>
    </div>
    </>

  );
}
