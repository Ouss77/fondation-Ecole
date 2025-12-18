"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "./Context/LanguageContext";
import { FaHandshake } from "react-icons/fa";

const Partenaires = () => {
  const { language } = useContext(LanguageContext);

  const partners = [
    { src: '/img/partenaire1.png', alt: 'Partenaire 1', name: 'Partenaire 1' },
    { src: '/img/partenaire2.png', alt: 'Partenaire 2', name: 'Partenaire 2' },
    { src: '/img/partenaire3.png', alt: 'Partenaire 3', name: 'Partenaire 3' }
  ];

  return (
    <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto py-10 mt-10">
      {/* Header avec icône */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <FaHandshake className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500">
            {language === "fr" ? "Nos Partenaires" : "Our Partners"}
          </h2>
        </div>
      </div>

      {/* Grid des partenaires */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-400 transform hover:-translate-y-2"
          >
            {/* Container pour l'image */}
            <div className="relative h-32 flex items-center justify-center mb-4">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={180}
                height={120}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-600/0 group-hover:from-yellow-400/5 group-hover:to-yellow-600/5 rounded-2xl transition-all duration-300" />
            
            {/* Badge décoratif */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Texte de bas de section */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 italic">
          {language === "fr" 
            ? "Merci à nos partenaires pour leur confiance et leur soutien" 
            : "Thank you to our partners for their trust and support"}
        </p>
      </div>
    </div>
  );
};

export default Partenaires;