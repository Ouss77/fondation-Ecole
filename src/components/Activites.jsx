import React from 'react';

function Activites() {
    return (
        <div className="w-11/12 mx-auto rounded-xl py-10 bg-gray-100 mt-10">
          {/* Main Title */}
          <h1 className="text-4xl font-bold mx-9 xl:mx-32 text-yellow-600 mb-6 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
            Activités
          </h1>

          {/* Description Paragraph */}
          <p className="text-lg text-gray-600 mx-8 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 text-justify leading-8 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-10">
            L’AF3M organise tous les 2 ans un congrès international ouvert à tous les chercheurs en mécanique et matériaux.
            <br /><br />

            L’objectif de cette manifestation est de favoriser les rencontres entre Industriels, Chercheurs, Enseignants et Organismes Publics concernés par les problèmes de développement durable et d’environnement. Nous y abordons des questions d’actualité sous leurs aspects Scientifiques, Technologiques, Méthodologiques et Économiques en mettant en œuvre tous les acquis et toutes les avancées de la Mécanique. En effet, les problèmes de limitation des rejets, d’économie d’énergie, d’énergies renouvelables, de meilleure utilisation des matières premières, de l’approvisionnement et du traitement de l’eau font largement appel à des méthodes, des procédés, des machines et des services du domaine des industries ou des sciences mécaniques.
            <br /><br />
            Tous les domaines industriels sont concernés: transports (automobiles, ferroviaire, maritime, aéronautique), Énergie (production d’électricité, de gaz, de carburant), Producteurs et Transformateurs de matières premières (sidérurgie, plasturgie, composites), Industries mécaniques (producteurs de pièces et de machines, traitements de surface), Sociétés de services (traitement de l’eau et des déchets, recyclage) et enfin Organismes publics de développement, de réglementation, de contrôle.
          </p>
        </div>
    );
}

export default Activites;
