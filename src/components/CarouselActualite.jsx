"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CarouselActualite() {
  const [actualites, setActualites] = useState([]); // State to hold the fetched data
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await axios.get("http://localhost/AF3M-Backend/getActualite.php");
        setActualites(response.data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching actualites:", error);
      }
    };

    fetchActualites();
  }, []); // Empty dependency array to run only once when the component mounts

  // Get the last three actualites
  const lastThreeActualites = actualites.slice(-3);

  // Function to move to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lastThreeActualites.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + lastThreeActualites.length) % lastThreeActualites.length
    );
  };

  useEffect(() => {
    if (isHovered) return; // Do not auto-slide if hovered

    const interval = setInterval(handleNext, 3000); // Change slide every 3 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [isHovered]); // Re-run when hover state changes

  return (
    <div
      className="relative mx-auto w-11/12 h-[600px] overflow-hidden rounded-lg top-24"
      onMouseEnter={() => setIsHovered(true)} // Pause on hover
      onMouseLeave={() => setIsHovered(false)} // Resume auto-slide when mouse leaves
    >
      {/* Map through the lastThreeActualites array to render the current slide */}
      {lastThreeActualites.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-5 bg-cover bg-center transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}

          style={{
                    backgroundImage: `url(http://192.168.1.21/AF3M-Backend/${item.image_url})`,
          }}
        >
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

      {/* Carousel controls */}
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
