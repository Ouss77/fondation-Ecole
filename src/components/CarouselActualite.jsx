"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image"; // Use Next.js Image component
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Font Awesome icons
import { LanguageContext } from "./Context/LanguageContext";
import Head from "next/head";

export default function CarouselActualite() {
  const [actualites, setActualites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getActualite.php`
        );
        setActualites(response.data);
      } catch (error) {
        console.error("Error fetching actualites:", error);
      }
    };

    fetchActualites();
  }, []);

  const lastThreeActualites = actualites.slice(-3);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % lastThreeActualites.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + lastThreeActualites.length) %
        lastThreeActualites.length
    );
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);


  return (
  <>

  <Head>
    <title>Carousel Actualité</title>
    <meta name="description" content="Découvrez les dernières actualités de notre association."/>
    <meta name="keywords" content="actualités, association, nouvelles, événements"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    </Head>
    
      <div
        className="relative mx-auto w-11/12 sm:w-9/12 sm:h-[600px] h-[440px] overflow-hidden rounded-lg top-32 sm:top-24  "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {lastThreeActualites.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full  h-auto transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image Container */}
            <div className="relative w-full ">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image_url}`}
                alt={item.Titre || "Actualité image"}
                about="Actualité image"
                width={500}
                height={450}
                // layout="fill"  // Ensures the image fills the container
                // objectFit="cover"  // Makes the image cover the container without distortion
                className="z-0 sm:h-[530px] w-full h-56 mt-20 lg:mt-14 rounded-lg"
                priority={index === 0}
              />

              {/* Title Section (Top of Image) */}
              <div className="absolute -top-24 lg:-top-16 left-0 right-0 pt-4 bg-opacity-100 z-10">
                <h2 className="text-xl md:text-3xl lg:text-2xl text-center font-bold text-yellow-700  drop-shadow-lg">
                  {language === "fr" ? item.title_fr : item.title_en}
                </h2>
              </div>
            </div>

            {/* Description Section (Below Image) */}
            <div className="absolute sm:bottom-5 w-full sm:w-[80%]  sm:left-5  md:p-8 lg:p-5 bg-white bg-opacity-80 z-10  rounded ">
              <p className="text-base text-justify   md:text-lg lg:text-xl text-gray-600 ">
                {language === "fr" ? item.description_fr : item.description_en}
              </p>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 sm:top-1/2 left-1 transform -translate-y-1/2 px-4 z-20">
          <button
            aria-label="Previous"
            onClick={handlePrevious}
            className="text-white bg-gray-800 rounded-full p-3 hover:bg-gray-700"
          >
            <FaChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 sm:top-1/2 right-1 transform -translate-y-1/2 px-4 z-20">
          <button
            aria-label="Next"
            onClick={handleNext}
            className="text-white bg-gray-800 rounded-full p-3 hover:bg-gray-700"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
