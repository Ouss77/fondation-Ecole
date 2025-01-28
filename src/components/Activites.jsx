import React, { useContext } from 'react';

import { LanguageContext } from './Context/LanguageContext';
function Activites() {
  const { language } = useContext(LanguageContext);
  const content = {
    fr: {
      title: "Activités",
      description: `
        L’AF3M organise tous les 2 ans un congrès international ouvert à tous les chercheurs en mécanique et matériaux.
        <br /><br />
        L’objectif de cette manifestation est de favoriser les rencontres entre Industriels, Chercheurs, Enseignants et Organismes Publics concernés par les problèmes de développement durable et d’environnement. Nous y abordons des questions d’actualité sous leurs aspects Scientifiques, Technologiques, Méthodologiques et Économiques en mettant en œuvre tous les acquis et toutes les avancées de la Mécanique. En effet, les problèmes de limitation des rejets, d’économie d’énergie, d’énergies renouvelables, de meilleure utilisation des matières premières, de l’approvisionnement et du traitement de l’eau font largement appel à des méthodes, des procédés, des machines et des services du domaine des industries ou des sciences mécaniques.
        <br /><br />
        Tous les domaines industriels sont concernés: transports (automobiles, ferroviaire, maritime, aéronautique), Énergie (production d’électricité, de gaz, de carburant), Producteurs et Transformateurs de matières premières (sidérurgie, plasturgie, composites), Industries mécaniques (producteurs de pièces et de machines, traitements de surface), Sociétés de services (traitement de l’eau et des déchets, recyclage) et enfin Organismes publics de développement, de réglementation, de contrôle.
      `
    },
    en: {
      title: "Activities",
      description: `
        AF3M organizes an international congress every 2 years open to all researchers in mechanics and materials.
        <br /><br />
        The objective of this event is to promote meetings between Industrialists, Researchers, Teachers, and Public Bodies concerned with sustainable development and environmental issues. We address current issues from their Scientific, Technological, Methodological, and Economic aspects by implementing all the knowledge and advances in Mechanics. Indeed, issues of waste reduction, energy conservation, renewable energies, better use of raw materials, water supply, and treatment are widely addressed using methods, processes, machines, and services from the field of industries or mechanical sciences.
        <br /><br />
        All industrial sectors are concerned: transportation (automobiles, railways, maritime, aeronautics), Energy (production of electricity, gas, fuel), Producers and Processors of raw materials (steel, plastics, composites), Mechanical industries (producers of parts and machines, surface treatments), Service companies (water and waste treatment, recycling) and finally Public bodies for development, regulation, and control.
      `
    } 
  };

  return (
<div className="w-11/12 sm:w-10/12 mx-auto rounded-xl py-10 bg-gray-100 mt-10">
  {/* Main Title */}
  <h1 className="text-2xl font-bold mx-5 xl:mx-20 text-yellow-600 mb-6 sm:text-3xl xl:text-3xl">
    {content[language].title}
  </h1>

  {/* Description Paragraph */}
  <p
    className="text-lg text-gray-600 mx-5 xl:mx-20 text-justify leading-loose"
    dangerouslySetInnerHTML={{ __html: content[language].description }}
  ></p>
</div>
  );
}

export default Activites;
