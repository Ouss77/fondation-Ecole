import ArticleChart from "@/components/ArticleChart";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Reusable DashboardCard Component
const DashboardCard = ({ icon, title, count }) => {
  return (
    <section className="flex justify-between border-4 mx-4 h-32 w-52 bg-gray-200 rounded-lg hover:scale-105 hover:bg-blue-400 hover:shadow-lg duration-500">
      <Image height={64} width={64} className="w-16 h-16 my-7 ml-2" src={icon} alt={`${title}-icon`} />
      <span className="my-auto">
        <p className="text-center font-bold text-xl">{count !== null ? count : "Loading..."}</p>
        <h3 className="text-center mr-2">{title}</h3>
      </span>
    </section>
  );
};

function Dashboard() {
  const [articleCount, setArticleCount] = useState(null);
  const [actualitesCount, setActualitesCount] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [themes, setThemes] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`);
        const data = await response.json();
        setter(data.article_count || data.actualite_count || 0);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      }
    };

    fetchData("getArticles_Count.php", setArticleCount);
    fetchData("getAuthors_Count.php", setAuthors);
    fetchData("getActualites_Count.php", setActualitesCount);
    fetchData("getThemes_Count.php", setThemes);
  }, []);

  return (
    <>
        <div className="lg:flex items-center justify-center mt-14 gap-20 ml-10">
      <DashboardCard icon="/article.png" title="Articles" count={articleCount} />
      <DashboardCard icon="/editor.png" title="Authors" count={authors} />
      <DashboardCard icon="/world-news.png" title="Actualites" count={actualitesCount} />
      <DashboardCard icon="/team.png" title="Themes" count={themes} />
    </div>
    <div className="mt-10 ml-48">

          <ArticleChart />
    </div>
    </>

  );
}

export default Dashboard;
