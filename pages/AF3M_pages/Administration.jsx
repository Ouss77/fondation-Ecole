import { LanguageContext } from "@/components/Context/LanguageContext";
import ParticipentTable from "@/components/ParticipentTable";
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
    <main className="flex flex-col">
      <section className="flex-grow container mx-auto w-11/12 px-4 mt-44">
        <h1 className="text-xl lg:text-3xl font-bold text-yellow-600 text-left mb-10">
          {language === "fr" ? "Liste des Participants" : "List of Participants"}
        </h1>
        <ParticipentTable participants={translatedParticipants} />
      </section>
    </main>
  );
}
