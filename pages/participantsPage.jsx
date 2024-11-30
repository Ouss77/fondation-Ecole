
import ParticipentTable from "@/components/ParticipentTable";

export default function   () {
  const participants = [
    { firstName: "Zitouni AZARI	", institution: "Université de Lorraine", role: "Président" },
    { firstName: "Leila KHALIJ", institution: "INSA de Rouen", role: "Secrètaire " },
    { firstName: "Said Hariri	", institution: "Ecole des Mines de Douai", role: "Vices Présidents" },
    { firstName: "Jean-Claude LACHAT	", institution: "Industriel", role: "Vices Présidents" },
    { firstName: "Abdellatif IMAD	", institution: "Polytech’Lille", role: "Vices Présidents" },
    { firstName: "Abdelouahed LAKSIMI", institution: "Université de technologie de compiegne", role: "Trésorier " },
  ];

  return (
    <main className=" flex flex-col ">
      <section className="flex-grow container mx-auto px-4 mt-44  ">
        <h1 className="text-xl lg:text-4xl font-bold text-yellow-600 text-left mb-20 ">Liste des Participants</h1>
        <ParticipentTable participants={participants} />
      </section>
    </main>
  );
}
