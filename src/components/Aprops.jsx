"use client";
import React, { useContext } from "react";
import { LanguageContext } from "./Context/LanguageContext";

const Aprops = () => {
  const { language } = useContext(LanguageContext);
  //const language = "fr";
  const content = {
    fr: {
      title: "À PROPOS",
      subtitle: "L’Association Franco-Maghrébine de Mécanique et des Matériaux",
      description: `
        AF3M fondée en 2000, est une association à but non lucratif qui vise à
        regrouper toutes les personnes physiques ou morales dont l’activité est
        en relation avec les sciences mécaniques notamment les universitaires et
        les industriels.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        La promotion et le développement des espaces de coopération et
        d’échanges dans le domaine de la recherche, de l’enseignement et de
        l’industrie en mécanique et matériaux, entre la France et le Maghreb.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        Le soutien à l’organisation de journées techniques, de conférences, de
        congrès, de séminaires, etc., prévus au Maghreb ou en France par des
        associations scientifiques, des universités ou par le milieu industriel.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        La valorisation et la publication des différents travaux réalisés dans
        le domaine des sciences mécaniques et des matériaux.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        L’établissement de contacts et de relations durables entre différentes
        associations nationales et internationales.
      `
    },
    en: {
      title: "ABOUT US",
      subtitle: "The Franco-Maghreb Association of Mechanics and Materials",
      description: `
        Founded in 2000, AF3M is a non-profit association that aims to bring
        together all individuals or entities whose activities are related to
        mechanical sciences, especially academics and industry professionals.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        The promotion and development of cooperation and exchange spaces in
        research, teaching, and industry in mechanics and materials, between
        France and the Maghreb.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        Support for organizing technical days, conferences, congresses,
        seminars, etc., planned in the Maghreb or France by scientific
        associations, universities, or the industrial sector.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        Enhancing and publishing various works carried out in the field of
        mechanical sciences and materials.
        <br /><br />
        <i className="fas fa-chevron-right text-yellow-600 mr-2"></i>
        Establishing contacts and lasting relationships between different
        national and international associations.
      `
    }
  };

  return (
<div className="w-11/12 sm:w-10/12 box-border mx-auto rounded-xl py-12 px-6 bg-gray-100 shadow-lg mt-44">
  <h1 className="font-bold mx-5 xl:mx-20 text-yellow-600 mb-6 text-2xl sm:text-3xl">
    {content[language].title}
  </h1>
  <h2 className="text-xl sm:text-2xl font-semibold mx-5 xl:mx-20 text-gray-800 mb-6">
    {content[language].subtitle}
  </h2>
  <p
    className="text-lg text-gray-700 mx-5 xl:mx-20 text-justify leading-relaxed"
    dangerouslySetInnerHTML={{ __html: content[language].description }}
  ></p>
</div>

  );
};

export default Aprops;
