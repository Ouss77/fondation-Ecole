import React, { useContext } from 'react';
import { LanguageContext } from './Context/LanguageContext';
import { FaCalendarAlt, FaIndustry, FaLeaf, FaCogs, FaUsers, FaRecycle } from 'react-icons/fa';

function Activites() {
  const { language } = useContext(LanguageContext);
  
  const content = {
    fr: {
      title: "Activités",
      congress: {
        title: "Congrès International",
        description: "L'AF3M organise tous les 2 ans un congrès international ouvert à tous les chercheurs en mécanique et matériaux."
      },
      objective: {
        title: "Notre Objectif",
        description: "Favoriser les rencontres entre Industriels, Chercheurs, Enseignants et Organismes Publics concernés par les problèmes de développement durable et d'environnement. Nous y abordons des questions d'actualité sous leurs aspects Scientifiques, Technologiques, Méthodologiques et Économiques en mettant en œuvre tous les acquis et toutes les avancées de la Mécanique."
      },
      themes: {
        title: "Thématiques Abordées",
        items: [
          "Limitation des rejets",
          "Économie d'énergie",
          "Énergies renouvelables",
          "Meilleure utilisation des matières premières",
          "Approvisionnement et traitement de l'eau"
        ]
      },
      sectors: {
        title: "Secteurs Industriels Concernés",
        items: [
          { icon: <FaIndustry />, name: "Transports", desc: "Automobiles, ferroviaire, maritime, aéronautique" },
          { icon: <FaLeaf />, name: "Énergie", desc: "Production d'électricité, gaz, carburant" },
          { icon: <FaCogs />, name: "Matières Premières", desc: "Sidérurgie, plasturgie, composites" },
          { icon: <FaIndustry />, name: "Industries Mécaniques", desc: "Pièces, machines, traitements de surface" },
          { icon: <FaRecycle />, name: "Services", desc: "Traitement de l'eau et des déchets, recyclage" },
          { icon: <FaUsers />, name: "Organismes Publics", desc: "Développement, réglementation, contrôle" }
        ]
      }
    },
    en: {
      title: "Activities",
      congress: {
        title: "International Congress",
        description: "AF3M organizes an international congress every 2 years open to all researchers in mechanics and materials."
      },
      objective: {
        title: "Our Objective",
        description: "To promote meetings between Industrialists, Researchers, Teachers, and Public Bodies concerned with sustainable development and environmental issues. We address current issues from their Scientific, Technological, Methodological, and Economic aspects by implementing all the knowledge and advances in Mechanics."
      },
      themes: {
        title: "Topics Addressed",
        items: [
          "Waste reduction",
          "Energy conservation",
          "Renewable energies",
          "Better use of raw materials",
          "Water supply and treatment"
        ]
      },
      sectors: {
        title: "Industrial Sectors Concerned",
        items: [
          { icon: <FaIndustry />, name: "Transportation", desc: "Automobiles, railways, maritime, aeronautics" },
          { icon: <FaLeaf />, name: "Energy", desc: "Production of electricity, gas, fuel" },
          { icon: <FaCogs />, name: "Raw Materials", desc: "Steel, plastics, composites" },
          { icon: <FaIndustry />, name: "Mechanical Industries", desc: "Parts, machines, surface treatments" },
          { icon: <FaRecycle />, name: "Services", desc: "Water and waste treatment, recycling" },
          { icon: <FaUsers />, name: "Public Bodies", desc: "Development, regulation, control" }
        ]
      }
    }
  };

  return (
    <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto py-10 mt-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500 mb-2">
          {content[language].title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r mx-auto from-yellow-600 to-yellow-400 rounded-full" />
      </div>

      {/* Congress Card */}
      <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg p-6 mb-6 border border-yellow-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <FaCalendarAlt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {content[language].congress.title}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              {content[language].congress.description}
            </p>
          </div>
        </div>
      </div>

      {/* Objective Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          {content[language].objective.title}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed text-justify">
          {content[language].objective.description}
        </p>
      </div>

      {/* Themes Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {content[language].themes.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {content[language].themes.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Sectors */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {content[language].sectors.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content[language].sectors.items.map((sector, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-yellow-400"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  {sector.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activites;