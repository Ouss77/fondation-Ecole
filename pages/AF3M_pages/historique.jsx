import React, { useContext } from "react";
import { LanguageContext } from "@/components/Context/LanguageContext";
import Head from "next/head";

function Historique() {
  const { language } = useContext(LanguageContext);

  const content = {
    fr: {
      title: "Historique",
      paragraph1:
        "Depuis 2000, les JET ont été organisées dans la ville de Marrakech en raison du soutien logistique de son Université Cadi Ayad et de ses enseignants–chercheurs, ainsi que de l’attractivité de cette jolie ville. Cette organisation a été prolongée sur plusieurs années : 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2018 et 2022 (voir les communications de ces éditions).",
      paragraph2:
        "En 2016, nous avons décidé d’organiser pour la première fois les JET à Hammamet, Tunisie, du 3 au 5 mai 2016, en étroite collaboration avec l’Association Tunisienne de Mécanique (ATM).",
    },
    en: {
      title: "History",
      paragraph1:
        "Since 2000, the JET events have been organized in the city of Marrakech due to the logistical support from its Cadi Ayad University and its teacher-researchers, as well as the attractiveness of this lovely city. This organization has been extended over several years: 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2018, and 2022 (see the communications from these editions).",
      paragraph2:
        "In 2016, we decided to organize the JET for the first time in Hammamet, Tunisia, from May 3rd to 5th, 2016, in close collaboration with the Tunisian Association of Mechanics (ATM).",
    },
  };

  return (
    <>
      <Head>
        <title>{content[language].title} - AF3M</title>
        <meta
          name="description"
          content={content[language].paragraph1}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={content[language].title} />
        <meta
          property="og:description"
          content={content[language].paragraph1}
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* SECTION HISTORIQUE */}
<section className="pt-28 pb-20 px-4 sm:px-6 lg:px-10">
  <div className="max-w-7xl mx-auto">

    {/* Section Title */}
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-600">
        {content[language].title}
      </h2>
      <div className="mt-3 h-1.5 w-24 bg-yellow-500 rounded-full" />
    </div>

    {/* Main Card */}
    <div className="bg-blue-50 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-md">

      <div className="grid lg:grid-cols-2 gap-14 items-start">

        {/* LEFT – Narrative */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-yellow-600">
            {language === "fr"
              ? "Une histoire scientifique ancrée dans la durée"
              : "A scientific journey rooted in continuity"}
          </h3>

          <p className="text-gray-700 text-lg leading-8 text-justify">
            {content[language].paragraph1}
          </p>

          <p className="text-gray-700 text-lg leading-8 text-justify">
            {content[language].paragraph2}
          </p>
        </div>

        {/* RIGHT – Timeline */}
        <div className="relative pl-10">

          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-1 bg-yellow-400 rounded-full" />

          <div className="space-y-12">

            <div className="flex items-start gap-6">
              <span className="w-5 h-5 bg-yellow-500 rounded-full mt-1 shadow" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  2000 – Marrakech
                </p>
                <p className="text-gray-600">
                  Lancement des JET avec le soutien de l’Université Cadi Ayad
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <span className="w-5 h-5 bg-yellow-500 rounded-full mt-1 shadow" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  2002 → 2014
                </p>
                <p className="text-gray-600">
                  Consolidation des éditions et structuration scientifique
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <span className="w-5 h-5 bg-yellow-500 rounded-full mt-1 shadow" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  2016 – Hammamet
                </p>
                <p className="text-gray-600">
                  Première édition internationale en Tunisie (ATM)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <span className="w-5 h-5 bg-yellow-500 rounded-full mt-1 shadow" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  2018 – 2022
                </p>
                <p className="text-gray-600">
                  Continuité, diversification des thématiques et ouverture
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>


    </>
  );
}

export default Historique;
