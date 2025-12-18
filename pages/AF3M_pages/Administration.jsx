import { LanguageContext } from "@/components/Context/LanguageContext";
import Head from "next/head";
import { useContext } from "react";

export default function ParticipantPage() {
  const { language } = useContext(LanguageContext);

  const participants = [
    { 
      name: "Zitouni AZARI", 
      institution: "Université de Lorraine", 
      role: { fr: "Président", en: "President" } 
    },
    { 
      name: "Leila KHALIJ", 
      institution: "INSA de Rouen", 
      role: { fr: "Secrétaire", en: "Secretary" } 
    },
    { 
      name: "Said Hariri", 
      institution: "École des Mines de Douai", 
      role: { fr: "Vice-Président", en: "Vice President" } 
    },
    { 
      name: "Jean-Claude LACHAT", 
      institution: "Industriel", 
      role: { fr: "Vice-Président", en: "Vice President" } 
    },
    { 
      name: "Abdellatif IMAD", 
      institution: "Polytech’Lille", 
      role: { fr: "Vice-Président", en: "Vice President" } 
    },
    { 
      name: "Abdelouahed LAKSIMI", 
      institution: "Université de Technologie de Compiègne", 
      role: { fr: "Trésorier", en: "Treasurer" } 
    },
  ];

  return (
    <>
      <Head>
        <title>
          {language === "fr"
            ? "Liste des Participants - AF3M"
            : "List of Participants - AF3M"}
        </title>
        <meta
          name="description"
          content={
            language === "fr"
              ? "Découvrez les membres et responsables de l’AF3M."
              : "Discover the members and officials of AF3M."
          }
        />
      </Head>

      <main className="container mx-auto px-4 sm:px-6 lg:px-16 pt-36 pb-20">
        {/* Title */}
    {/* Section Title */}
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-600">
        {language === "fr" ? "Liste des Participants" : "List of Participants"}
      </h2>
      <div className="mt-3 h-1.5 w-24 bg-yellow-500 rounded-full" />
    </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Name */}
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {participant.name}
              </h2>

              {/* Institution */}
              <p className="text-gray-600 text-sm md:text-base mb-4">
                {participant.institution}
              </p>

              {/* Role Badge */}
              <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-medium px-4 py-1 rounded-full">
                {participant.role[language]}
              </span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
