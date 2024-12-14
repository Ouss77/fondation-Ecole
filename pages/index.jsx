import CarouselActualite from "@/components/CarouselActualite";
import Partenaires from "@/components/Partenaires";
import Aprops from "@/components/Aprops";
import Activites from "@/components/Activites";

export default function Home({ actualites }) {
  return (
    <main>
      <section className="">
        <CarouselActualite actualites={actualites} />
      </section>
      <Aprops />
      <section className="mt-8">
        <Activites />
      </section>
      <section className="mt-8">
        <Partenaires />
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const actualites = require("../data/actualites.json"); // Load local JSON file
  return {
    props: { actualites },
  };
}
