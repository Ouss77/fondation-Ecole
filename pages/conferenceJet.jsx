import React from 'react';

const ConferenceJet = () => {
  return (
    <div className="pt-40"> {/* Add padding top to account for the fixed header */}
      <section className="bg-gray-100 mx-56  rounded-lg shadow-md mb-20 p-20">
        <h2 className="text-4xl font-semibold text-yellow-600 mb-10">
          Objectifs des JET
        </h2>
        <p className="text-gray-800 mb-4 text-xl">
          Les Journées d’Etudes Techniques (JET), constituent une manifestation
          scientifique, à caractère internationale (The International Congress
          for Applied Mechanics), biannuelle organisée par l’AF3M depuis
          l’année 2000.
        </p>
        <p className="text-gray-800 mb-4 text-xl">
          Les JET se veulent un espace offrant aux participants un large panel
          de thématiques scientifiques et technologiques dans les domaines des
          sciences mécaniques, des matériaux et de leur contribution au
          développement durable. Elles se donnent comme objectif d’être un lieu
          de rencontres et d’échanges entre les acteurs correspondants aux pays
          du Maghreb et de la France (Europe et pays francophones) :
          Enseignants-chercheurs, chercheurs, ingénieurs et industriels.
        </p>
        <p className="text-gray-800 mb-4 text-xl">
          Dans ce cadre, L’AF3M encourage les jeunes doctorants à participer à
          ces rencontres.
        </p>
        <p className="text-gray-800 text-xl">
          Les JET s’organisent sur trois jours, fin d’avril ou début mai, selon
          les facilités logistiques. Depuis la création de l’AF3M et
          l’organisation des JET, de nombreuses coopérations entre chercheurs
          ont été établies en termes de co-encadrement de jeunes doctorants, de
          cotutelles de thèses offrant différentes possibilités de stage de
          laboratoires.
        </p>
      </section>
    </div>
  );
};

export default ConferenceJet;