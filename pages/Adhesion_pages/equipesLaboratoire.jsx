import React, { use, useContext } from 'react';
import { LanguageContext } from '@/components/Context/LanguageContext';

const ConferenceJet = () => {
  const { language } = useContext(LanguageContext);  // Access current language from context

  const content = {
    title: {
      fr: "Equipes et laboratoires de recherche",
      en: "Research teams and laboratories"
    },
    paragraphs: [
      {
        fr: "Les Journées d’Etudes Techniques (JET), constituent une manifestation scientifique, à caractère internationale (The International Congress for Applied Mechanics), biannuelle organisée par l’AF3M depuis l’année 2000.",
        en: "The Technical Study Days (JET) are an international scientific event (The International Congress for Applied Mechanics), organized biennially by AF3M since the year 2000."
      },
      {
        fr: "Les JET se veulent un espace offrant aux participants un large panel de thématiques scientifiques et technologiques dans les domaines des sciences mécaniques, des matériaux et de leur contribution au développement durable. Elles se donnent comme objectif d’être un lieu de rencontres et d’échanges entre les acteurs correspondants aux pays du Maghreb et de la France (Europe et pays francophones) : Enseignants-chercheurs, chercheurs, ingénieurs et industriels.",
        en: "JET aims to provide participants with a wide range of scientific and technological themes in the fields of mechanical sciences, materials, and their contribution to sustainable development. They aim to be a meeting and exchange place for participants from Maghreb and France (Europe and Francophone countries): academic researchers, researchers, engineers, and industrialists."
      },
      {
        fr: "Dans ce cadre, L’AF3M encourage les jeunes doctorants à participer à ces rencontres.",
        en: "In this context, AF3M encourages young doctoral students to participate in these meetings."
      },
      {
        fr: "Les JET s’organisent sur trois jours, fin d’avril ou début mai, selon les facilités logistiques. Depuis la création de l’AF3M et l’organisation des JET, de nombreuses coopérations entre chercheurs ont été établies en termes de co-encadrement de jeunes doctorants, de cotutelles de thèses offrant différentes possibilités de stage de laboratoires.",
        en: "JET is organized over three days, at the end of April or early May, depending on logistical facilities. Since the creation of AF3M and the organization of JET, numerous collaborations between researchers have been established in terms of co-supervision of young doctoral students and joint thesis supervision, offering various laboratory internship opportunities."
      }
    ]
  };

  return (
    <div className="sm:w-10/12 w-12/12 sm:pt-20 w-full mx-auto">
      <section className="conference-section">
        <h2 className='mt-20 sm:mt-0'>{content.title[language]}</h2>
        {content.paragraphs.map((para, index) => (
          <p key={index} className="text-gray-800 mb-4 w-full text-base text-justify sm:text-jusitfy sm:text-lg md:text-base leading-7 sm:leading-8 md:leading-9">
            {para[language]}
          </p>
        ))}
      </section>
    </div>
  );
};

export default ConferenceJet;
