"use client";
import React, { useContext } from "react";
import { LanguageContext } from "./Context/LanguageContext";
import { FaChevronRight, FaUsers, FaHandshake, FaBook, FaGlobe } from "react-icons/fa";

const Aprops = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    fr: {
      title: "À PROPOS",
      subtitle: "L'Association Franco-Maghrébine de Mécanique et des Matériaux",
      intro: "AF3M fondée en 2000, est une association à but non lucratif qui vise à regrouper toutes les personnes physiques ou morales dont l'activité est en relation avec les sciences mécaniques notamment les universitaires et les industriels.",
      objectives: [
        {
          icon: <FaHandshake className="w-5 h-5" />,
          text: "La promotion et le développement des espaces de coopération et d'échanges dans le domaine de la recherche, de l'enseignement et de l'industrie en mécanique et matériaux, entre la France et le Maghreb."
        },
        {
          icon: <FaUsers className="w-5 h-5" />,
          text: "Le soutien à l'organisation de journées techniques, de conférences, de congrès, de séminaires, etc., prévus au Maghreb ou en France par des associations scientifiques, des universités ou par le milieu industriel."
        },
        {
          icon: <FaBook className="w-5 h-5" />,
          text: "La valorisation et la publication des différents travaux réalisés dans le domaine des sciences mécaniques et des matériaux."
        },
        {
          icon: <FaGlobe className="w-5 h-5" />,
          text: "L'établissement de contacts et de relations durables entre différentes associations nationales et internationales."
        }
      ]
    },
    en: {
      title: "ABOUT US",
      subtitle: "The Franco-Maghreb Association of Mechanics and Materials",
      intro: "Founded in 2000, AF3M is a non-profit association that aims to bring together all individuals or entities whose activities are related to mechanical sciences, especially academics and industry professionals.",
      objectives: [
        {
          icon: <FaHandshake className="w-5 h-5" />,
          text: "The promotion and development of cooperation and exchange spaces in research, teaching, and industry in mechanics and materials, between France and the Maghreb."
        },
        {
          icon: <FaUsers className="w-5 h-5" />,
          text: "Support for organizing technical days, conferences, congresses, seminars, etc., planned in the Maghreb or France by scientific associations, universities, or the industrial sector."
        },
        {
          icon: <FaBook className="w-5 h-5" />,
          text: "Enhancing and publishing various works carried out in the field of mechanical sciences and materials."
        },
        {
          icon: <FaGlobe className="w-5 h-5" />,
          text: "Establishing contacts and lasting relationships between different national and international associations."
        }
      ]
    }
  };

  return (
    <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto py-10 mt-10">
      {/* Header Compact */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500 mb-2">
          {content[language].title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full mx-auto mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {content[language].subtitle}
        </h2>
      </div>

      {/* Introduction Compacte */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
          {content[language].intro}
        </p>
      </div>

      {/* Objectifs en Grid Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content[language].objectives.map((objective, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 hover:border-yellow-400"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                {objective.icon}
              </div>
              <div className="flex-1 flex items-start gap-2">
                <FaChevronRight className="text-yellow-600 mt-1 flex-shrink-0 text-sm" />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  {objective.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aprops;