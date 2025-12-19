import React, { useContext } from 'react';
import { LanguageContext } from '@/components/Context/LanguageContext';
import {
  FaGlobe,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaCalendarAlt,
  FaFlask
} from 'react-icons/fa';

const ConferenceJet = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    title: {
      fr: "Congrès International de Mécanique",
      en: "International Congress for Applied Mechanics"
    },
    subtitle: {
      fr: "The International Congress for Applied Mechanics",
      en: "Congrès International de Mécanique Appliquée"
    },
    highlights: [
      {
        icon: <FaGlobe className="w-5 h-5" />,
        titleFr: "International",
        titleEn: "International",
        descFr: "Maghreb & France",
        descEn: "Maghreb & France"
      },
      {
        icon: <FaCalendarAlt className="w-5 h-5" />,
        titleFr: "Biennal",
        titleEn: "Biennial",
        descFr: "Depuis 2000",
        descEn: "Since 2000"
      },
      {
        icon: <FaFlask className="w-5 h-5" />,
        titleFr: "Multidisciplinaire",
        titleEn: "Multidisciplinary",
        descFr: "Sciences & Technologie",
        descEn: "Science & Technology"
      }
    ],
    sections: [
      {
        icon: <FaGlobe className="w-6 h-6" />,
        titleFr: "Manifestation Scientifique Internationale",
        titleEn: "International Scientific Event",
        textFr:
          "Les Journées d'Études Techniques (JET) constituent une manifestation scientifique internationale organisée par l’AF3M depuis 2000.",
        textEn:
          "The Technical Study Days (JET) are an international scientific event organized by AF3M since 2000."
      },
      {
        icon: <FaUsers className="w-6 h-6" />,
        titleFr: "Échanges et Collaborations",
        titleEn: "Exchange and Collaboration",
        textFr:
          "Les JET offrent un espace d’échange entre enseignants-chercheurs, chercheurs, ingénieurs et industriels du Maghreb et de la France.",
        textEn:
          "JET provides a space for exchange between academics, researchers, engineers, and industrial partners from the Maghreb and France."
      },
      {
        icon: <FaGraduationCap className="w-6 h-6" />,
        titleFr: "Jeune Recherche",
        titleEn: "Young Research",
        textFr:
          "L’AF3M encourage activement la participation des jeunes doctorants à ces rencontres scientifiques.",
        textEn:
          "AF3M actively encourages young doctoral students to participate in these scientific meetings."
      }
    ],
    impact: {
      icon: <FaHandshake className="w-6 h-6" />,
      titleFr: "Collaborations et Impact",
      titleEn: "Collaborations and Impact",
      textFr:
        "Les JET favorisent les coopérations scientifiques, les cotutelles de thèses et les stages de recherche.",
      textEn:
        "JET fosters scientific collaborations, joint thesis supervision, and research internships."
    }
  };

  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-3">
            {content.title[language]}
          </h1>
          <div className="w-20 h-1 bg-yellow-500 rounded-full mx-auto mb-3" />
          <p className="text-lg text-gray-600 italic">
            {content.subtitle[language]}
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {content.highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-5 text-center border border-gray-100"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                {highlight.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                {language === "fr" ? highlight.titleFr : highlight.titleEn}
              </h3>
              <p className="text-sm text-gray-600">
                {language === "fr" ? highlight.descFr : highlight.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-5 mb-8">
          {content.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-yellow-500 rounded-xl flex items-center justify-center text-white">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === "fr" ? section.titleFr : section.titleEn}
                  </h2>
                  <p className="text-base text-gray-700 leading-7 text-justify">
                    {language === "fr" ? section.textFr : section.textEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex gap-4">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              {content.impact.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {language === "fr" ? content.impact.titleFr : content.impact.titleEn}
              </h2>
              <p className="text-base text-gray-700 leading-7 text-justify">
                {language === "fr" ? content.impact.textFr : content.impact.textEn}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConferenceJet;
