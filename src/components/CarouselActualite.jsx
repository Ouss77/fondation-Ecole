"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Use Next.js Image component

export default function CarouselActualite() {
  const [actualites, setActualites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await axios.get("/AF3M-Backend/getActualite.php");
        setActualites(response.data);
      } catch (error) {
        console.error("Error fetching actualites:", error);
      }
    };

    fetchActualites();
  }, []);

  const lastThreeActualites = actualites.slice(-3);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lastThreeActualites.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + lastThreeActualites.length) % lastThreeActualites.length
    );
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative mx-auto w-11/12 h-[600px] overflow-hidden rounded-lg top-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {lastThreeActualites.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`/AF3M-Backend/${item.image_url}`}
            alt={item.Titre || "Actualité image"}
            layout="fill"
            objectFit="cover"
            priority={index === 0} // Priority for the first visible slide
          />
          <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-70">
            <div className="text-center text-white p-6 md:p-10 lg:p-12">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-yellow-600 text-shadow-md mb-4">
                {item.Titre}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-shadow-md">
                {item.Description}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 left-1 transform -translate-y-1/2 px-4">
        <button
          onClick={handlePrevious}
          className="text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
        >
          &lt;
        </button>
      </div>
      <div className="absolute top-1/2 right-1 transform -translate-y-1/2 px-4">
        <button
          onClick={handleNext}
          className="text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
