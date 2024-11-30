"use client";
CarouselActualite
import Partenaires from "@/components/Partenaires";
import Aprops from "@/components/Aprops";
import Activites from "@/components/Activites";
import { useState, useEffect } from "react";
import CarouselActualite from "@/components/CarouselActualite";

export default function Home() {
  const [actualites, setActualites] = useState([]);
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch("/api/actualites");
        const data = await response.json();
        setActualites(data);
      } catch (error) {
        console.error("Failed to fetch actualites:", error);
      }
    };

    fetchActualites();
  }, []);
console.log(actualites);
  return (
    <main>
      <section className="mt-0">
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
