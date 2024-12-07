"use client";
import React from "react";

const Aprops = ({}) => {
  return (
    <div className="w-11/12 box-border mx-auto rounded-xl py-10 bg-gray-100 mt-44">
      {/* Main Title */}
      <h1 className=" font-bold mx-5 xl:mx-20 text-yellow-600 mb-6 text-xl xl:text-2xl">
        À PROPOS
      </h1>

      {/* Sub Title */}
      <h2 className="text-xl font-semibold mx-5 xl:mx-20 text-gray-700 mb-4 sm:text-2xl md:text-3xl lg:text-xl">
        L’Association Franco-Maghrébine de Mécanique et des Matériaux
      </h2>

      {/* Description Paragraph */}
      <p className="text-lg text-gray-600 mx-5  xl:mx-20 text-justify leading-8 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-10">
        AF3M fondée en 2000, est une association à but non lucratif qui vise à
        regrouper toutes les personnes physiques ou morales dont l’activité est
        en relation avec les sciences mécaniques notamment les universitaires et
        les industriels.
        <br />
        ➼ La promotion et le développement des espaces de coopération et
        d’échanges dans le domaine de la recherche, de l’enseignement et de
        l’industrie en mécanique et matériaux, entre la France et le Maghreb.
        <br />
        ➼ Le soutien à l’organisation de journées techniques, de conférences, de
        congrès, de séminaires, etc., prévus au Maghreb ou en France par des
        associations scientifiques, des universités ou par le milieu industriel.
        <br />
        ➼ La valorisation et la publication des différents travaux réalisés dans
        le domaine des sciences mécaniques et des matériaux.
        <br />
        ➼ L’établissement de contacts et de relations durables entre différentes
        associations nationales et internationales.
      </p>
    </div>
  );
};

export default Aprops;
