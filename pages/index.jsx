import CarouselActualite from "@/components/CarouselActualite";
import Partenaires from "@/components/Partenaires";
import Aprops from "@/components/Aprops";
import Activites from "@/components/Activites";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <> 
          <Head>
          <title>Home - AF3M</title>
        <meta
          name="description"
          content="Welcome to our website The Franco-Maghreb Association of Mechanics and Materials. Discover the latest news, activities, and partners."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Home - AF3M" />
        <meta
          property="og:description"
          content="Explore our latest updates, activities, and partnerships."        />
        <meta property="og:image" content="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
        <meta property="og:url" content="https://af3m-assoc.org/" />
        <meta property="og:type" content="website" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
      </Head>
      <main>
      <section className="">
        <CarouselActualite />
      </section>
      <Aprops />
      <section className="mt-8">
        <Activites />
      </section>
      <section className="mt-8">
        <Partenaires />
      </section>
    </main>
    </>
    

  );
}
