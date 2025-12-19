import React, { useContext } from 'react';
import { LanguageContext } from '@/components/Context/LanguageContext';
import {
  FaFlask,
  FaUsers,
  FaHandshake,
  FaGraduationCap,
  FaUniversity,
  FaGlobe
} from 'react-icons/fa';

const ConferenceJet = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    title: {
      fr: "Équipes et Laboratoires de Recherche",
      en: "Research Teams and Laboratories",
    },
    subtitle: {
      fr: "Réseau de Collaboration Scientifique",
      en: "Scientific Collaboration Network",
    },
    highlights: [
      {
        icon: <FaUniversity className="w-5 h-5" />,
        titleFr: "Laboratoires",
        titleEn: "Laboratories",
        descFr: "Partenaires académiques",
        descEn: "Academic partners"
      },
      {
        icon: <FaUsers className="w-5 h-5" />,
        titleFr: "Équipes",
        titleEn: "Teams",
        descFr: "Recherche collaborative",
        descEn: "Collaborative research"
      },
      {
        icon: <FaGlobe className="w-5 h-5" />,
        titleFr: "International",
        titleEn: "International",
        descFr: "Maghreb & France",
        descEn: "Maghreb & France"
      }
    ],
    sections: [
      {
        icon: <FaFlask className="w-6 h-6" />,
        titleFr: "Un Réseau Scientifique International",
        titleEn: "An International Scientific Network",
        textFr:
          "Les Journées d'Etudes Techniques (JET) constituent une manifestation scientifique à caractère international, organisée biennalement par l'AF3M depuis 2000.",
        textEn:
          "The Technical Study Days (JET) are an international scientific event organized biennially by AF3M since 2000."
      },
      {
        icon: <FaUsers className="w-6 h-6" />,
        titleFr: "Thématiques de Recherche Diversifiées",
        titleEn: "Diverse Research Themes",
        textFr:
          "Les JET offrent un large éventail de thématiques scientifiques et technologiques dans les sciences mécaniques, les matériaux et le développement durable.",
        textEn:
          "JET provides a wide range of scientific and technological themes in mechanical sciences, materials, and sustainable development."
      },
      {
        icon: <FaHandshake className="w-6 h-6" />,
        titleFr: "Plateforme d'Échanges et de Collaboration",
        titleEn: "Exchange and Collaboration Platform",
        textFr:
          "Un espace privilégié de rencontres entre enseignants-chercheurs, chercheurs, ingénieurs et industriels du Maghreb et de la France.",
        textEn:
          "A privileged exchange space for academics, researchers, engineers, and industry partners from the Maghreb and France."
      },
      {
        icon: <FaGraduationCap className="w-6 h-6" />,
        titleFr: "Soutien aux Jeunes Chercheurs",
        titleEn: "Support for Young Researchers",
        textFr:
          "L'AF3M encourage activement la participation des jeunes doctorants.",
        textEn:
          "AF3M actively encourages young doctoral students to participate."
      }
    ],
    callToAction: {
      titleFr: "Rejoignez Notre Réseau",
      titleEn: "Join Our Network",
      textFr:
        "Vous représentez un laboratoire ou une équipe de recherche ? Contactez-nous pour explorer les opportunités de collaboration.",
      textEn:
        "Do you represent a laboratory or research team? Contact us to explore collaboration opportunities.",
      buttonFr: "Nous Contacter",
      buttonEn: "Contact Us"
    }
  };

  return (
    <section className="pt-24 pb-14 px-2 sm:px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl xl:max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500 mb-2">
            {content.title[language]}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full mx-auto mb-3" />
          <p className="text-base text-gray-600">
            {content.subtitle[language]}
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {content.highlights.map((h, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-5 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                {h.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-base">
                {language === "fr" ? h.titleFr : h.titleEn}
              </h3>
              <p className="text-sm text-gray-600">
                {language === "fr" ? h.descFr : h.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-5 mb-10">
          {content.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white">
                  {s.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {language === "fr" ? s.titleFr : s.titleEn}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                    {language === "fr" ? s.textFr : s.textEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            {language === "fr"
              ? content.callToAction.titleFr
              : content.callToAction.titleEn}
          </h2>
          <p className="text-base text-blue-100 mb-5 max-w-3xl mx-auto">
            {language === "fr"
              ? content.callToAction.textFr
              : content.callToAction.textEn}
          </p>
          <a
            href="/Adhesion_pages/devenirMembre"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            <FaHandshake className="w-5 h-5" />
            {language === "fr"
              ? content.callToAction.buttonFr
              : content.callToAction.buttonEn}
          </a>
        </div>

      </div>
    </section>
  );
};

export default ConferenceJet;
