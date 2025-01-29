"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image"; // Use Next.js Image component
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Font Awesome icons
import { LanguageContext } from "./Context/LanguageContext";

export default function CarouselActualite() {
  const [actualites, setActualites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getActualite.php`);
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
  className="relative mx-auto w-11/12 sm:w-9/12 sm:h-[660px] h-[540px] overflow-hidden rounded-lg top-28 border-2 border-blue-800"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {lastThreeActualites.map((item, index) => (
    <div
      key={index}
      className={`absolute inset-0 w-full transition-opacity duration-500 ${
        index === currentIndex ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full h-[350px] sm:h-[608px] ">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image_url}`}
          alt={item.Titre || "Actualité image"}
          layout="fill"
          objectFit=""
          className="z-0 mt-16"
          priority={index === 0}
        />

        {/* Title Section (Top of Image) */}
        <div className="absolute top-0 left-0 right-0 p-3 bg-green-50 bg-opacity-100 z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-700 mb-2 drop-shadow-lg">
          {language === "fr" ? item.title_fr : item.title_en}
          </h2>
        </div>
      </div>

      {/* Description Section (Below Image) */}
      <div className="absolute bottom-2 w-full sm:w-[80%]  sm:left-5 p-6 md:p-8 lg:p-10 bg-white bg-opacity-90 z-10 my-auto ">
        <p className="text-base md:text-lg lg:text-xl text-gray-600 ">
        {language === "fr" ? item.description_fr : item.description_en}
        </p>
      </div>
    </div>
  ))}

  {/* Navigation Buttons */}
  <div className="absolute top-1/2 left-1 transform -translate-y-1/2 px-4 z-20">
    <button
      onClick={handlePrevious}
      className="text-white bg-gray-800 rounded-full p-3 hover:bg-gray-700"
    >
      <FaChevronLeft size={24} />
    </button>
  </div>
  <div className="absolute top-1/2 right-1 transform -translate-y-1/2 px-4 z-20">
    <button
      onClick={handleNext}
      className="text-white bg-gray-800 rounded-full p-3 hover:bg-gray-700"
    >
      <FaChevronRight size={24} />
    </button>
  </div>
</div>


  
  );
}
