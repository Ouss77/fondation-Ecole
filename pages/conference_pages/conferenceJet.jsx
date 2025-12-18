import React, { useContext } from "react";
import { LanguageContext } from "@/components/Context/LanguageContext";

const ConferenceJet = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    title: {
      fr: "Objectifs des JET",
      en: "Objectives of JET",
    },
    paragraphs: [
      {
        fr: "Les Journées d’Études Techniques (JET) constituent une manifestation scientifique à caractère international (The International Congress for Applied Mechanics), organisée de manière biennale par l’AF3M depuis l’année 2000.",
        en: "The Technical Study Days (JET) are an international scientific event (The International Congress for Applied Mechanics), organized biennially by AF3M since the year 2000.",
      },
      {
        fr: "Les JET offrent aux participants un large éventail de thématiques scientifiques et technologiques dans les domaines des sciences mécaniques, des matériaux et de leur contribution au développement durable.",
        en: "JET provides participants with a wide range of scientific and technological themes in mechanical sciences, materials, and their contribution to sustainable development.",
      },
      {
        fr: "Elles constituent un espace privilégié de rencontres et d’échanges entre enseignants-chercheurs, chercheurs, ingénieurs et industriels issus des pays du Maghreb et de la France (Europe et pays francophones).",
        en: "They serve as a privileged meeting and exchange platform for academics, researchers, engineers, and industrial partners from the Maghreb and France (Europe and Francophone countries).",
      },
      {
        fr: "Dans ce cadre, l’AF3M encourage fortement la participation des jeunes doctorants à ces rencontres scientifiques.",
        en: "In this context, AF3M strongly encourages young doctoral students to take part in these scientific meetings.",
      },
      {
        fr: "Les JET se déroulent sur trois jours, généralement à la fin avril ou au début mai. Depuis leur création, elles ont permis l’établissement de nombreuses coopérations scientifiques, notamment en matière de co-encadrement de doctorants, de cotutelles de thèses et de stages en laboratoires.",
        en: "JET is organized over three days, usually at the end of April or early May. Since their creation, they have fostered numerous scientific collaborations, including joint doctoral supervision, co-tutelle theses, and laboratory internships.",
      },
    ],
  };

  return (
    <section className="pt-36 pb-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl p-8 sm:p-10 md:p-14 shadow-sm">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-600 mb-6">
          {content.title[language]}
        </h2>

        {/* Decorative line */}
        <div className="w-20 h-1 bg-yellow-500 mb-10 rounded-full" />

        {/* Content */}
        <div className="space-y-6">
          {content.paragraphs.map((para, index) => (
            <p
              key={index}
              className="text-gray-800 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 md:leading-9 text-justify"
            >
              {para[language]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConferenceJet;
