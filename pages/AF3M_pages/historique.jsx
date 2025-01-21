import React, { useContext } from 'react';
import { LanguageContext } from '@/components/Context/LanguageContext'; // Import the context

function Historique() {
  const { language } = useContext(LanguageContext); // Get the current language from context

  const content = {
    fr: {
      title: "Historique",
      paragraph1: "Depuis 2000, les JET ont été organisées dans la ville de Marrakech en raison du soutien logistique de son Université Cadi Ayad et de ses enseignants–chercheurs, ainsi que de l’attractivité de cette jolie ville. Cette organisation a été prolongée sur plusieurs années : 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2018 et 2022 (voir les communications de ces éditions).",
      paragraph2: "En 2016, nous avons décidé d’organiser pour la première fois les JET à Hammamet, Tunisie, du 3 au 5 mai 2016, en étroite collaboration avec l’Association Tunisienne de Mécanique (ATM)."
    },
    en: {
      title: "History",
      paragraph1: "Since 2000, the JET events have been organized in the city of Marrakech due to the logistical support from its Cadi Ayad University and its teacher-researchers, as well as the attractiveness of this lovely city. This organization has been extended over several years: 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2018, and 2022 (see the communications from these editions).",
      paragraph2: "In 2016, we decided to organize the JET for the first time in Hammamet, Tunisia, from May 3rd to 5th, 2016, in close collaboration with the Tunisian Association of Mechanics (ATM)."
    }
  };

  return (
    <div>
      <section className="text-yellow px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 rounded-lg pt-36">
        <div className="bg-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-10 rounded-xl">
          <h2 className="text-xl md:text-3xl font-semibold text-yellow-600 mb-4">
            {content[language].title}
          </h2>
          <p className="text-gray-800 mb-4 text-base leading-7 sm:leading-8 md:leading-10 text-justify">
            {content[language].paragraph1}
          </p>
          <p className="text-gray-800 text-base leading-7 sm:leading-8 md:leading-10 text-justify">
            {content[language].paragraph2}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Historique;
