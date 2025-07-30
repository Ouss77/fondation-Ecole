import { LanguageContext } from "@/components/Context/LanguageContext";
import ParticipentTable from "@/components/ParticipentTable";
import Head from "next/head";
import { useContext } from "react";

export default function ParticipantPage() {
  const { language } = useContext(LanguageContext);  // Access current language from context

  const participants = [
    { 
      firstName: "Zitouni AZARI", 
      institution: "Université de Lorraine", 
      role: { fr: "Président", en: "President" } 
    },
    { 
      firstName: "Leila KHALIJ", 
      institution: "INSA de Rouen", 
      role: { fr: "Secrétaire", en: "Secretary" } 
    },
    { 
      firstName: "Said Hariri", 
      institution: "Ecole des Mines de Douai", 
      role: { fr: "Vice-Président", en: "Vice President" } 
    },
    { 
      firstName: "Jean-Claude LACHAT", 
      institution: "Industriel", 
      role: { fr: "Vice-Président", en: "Vice President" } 
    },
    { 
      firstName: "Abdellatif IMAD", 
      institution: "Polytech’Lille", 
      role: { fr: "Vice-Président", en: "Vice President" } 
    },
    { 
      firstName: "Abdelouahed LAKSIMI", 
      institution: "Université de technologie de Compiègne", 
      role: { fr: "Trésorier", en: "Treasurer" } 
    },
  ];

  // Map participants to include the role in the current language
  const translatedParticipants = participants.map((participant) => ({
    ...participant,
    role: participant.role[language]  // Use the correct translation
  }));

  return (
    <>
          <Head>
        <title>{language === "fr" ? "Liste des Participants - AF3M" : "List of Participants - AF3M"}</title>
        <meta
          name="description"
          content={language === "fr" ? "Découvrez la liste des participants à l'AF3M." : "Discover the list of participants at AF3M."}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={language === "fr" ? "Liste des Participants - AF3M" : "List of Participants - AF3M"} />
        <meta
          property="og:description"
          content={language === "fr" ? "Découvrez la liste des participants à l'AF3M." : "Discover the list of participants at AF3M."}
        />
        <meta property="og:image" content="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
        <meta property="og:url" content="https://af3m-assoc.org/participants" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
      </Head>
        <main className="flex flex-col">
      <section className="flex-grow container mx-auto w-11/12 px-4 mt-32">
        <h1 className="text-xl lg:text-3xl font-bold text-yellow-600  text-left mb-10">
          {language === "fr" ? "Liste des Participants" : "List of Participants"}
        </h1>
        <ParticipentTable participants={translatedParticipants} />
      </section>
    </main>
    </>

  );
}
