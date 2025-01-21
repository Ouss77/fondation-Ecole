import React, { useState } from "react";
import { useEffect } from "react";
function dashboard() {

  const [articleCount, setArticleCount] = useState(null);
  const [actualitesCount, setActualitesCount] = useState(null);

  useEffect(() => {
    // Fetch the article count from the PHP endpoint
    const fetchArticleCount = async () => {
      try {
        const response = await fetch("/api/getArticles_Count.php");
        const data = await response.json();
        setArticleCount(data.article_count); // Set the article count in state
      } catch (error) {
        console.error("Error fetching article count:", error);
      }
    };

    const fetchActualiteCount = async () => {
      try {
        const response = await fetch("/api/getActualites_Count.php");
        const data = await response.json();
        setActualitesCount(data.actualite_count); // Set the article count in state
      } catch (error) {
        console.error("Error fetching article count:", error);
      }
    };

    fetchArticleCount(); // Call the function when the component mounts
    fetchActualiteCount();
  }, []);

  return (

    <>
      <h1>
        This is the Dashboard where i should add graphs and some statistics for
        my website
      </h1>
      <div className="flex items-center justify-center mt-20 gap-20 ">
        <section className="border-4 h-52 w-52 bg-blue-300 rounded-lg hover:scale-105 hover:bg-blue-400 hover:shadow-lg  duration-500">
          <img
            className="w-16 h-16 mx-auto my-5"
            src="/article.png"
            alt="article-icone"
          />
          <p className="text-center font-bold">{articleCount !== null ? articleCount : "Loading..."}</p>

          <h3 className="text-center">Articles</h3>
        </section>
        <section className="border-4 h-52 w-52 bg-blue-300 rounded-lg hover:scale-105 hover:bg-blue-400 hover:shadow-lg  duration-500">
          <img
            className="w-16 h-16 mx-auto my-5"
            src="/world-news.png"
            alt="article-icone"
          />
          <p className="text-center font-bold">{actualitesCount !== null ? actualitesCount : "Loading..."}</p>

          <h3 className="text-center">Actualites</h3>
        </section>
        <section className="border-4 h-52 w-52 bg-blue-300 rounded-lg hover:scale-105 hover:bg-blue-400 hover:shadow-lg  duration-500">
          <img
            className="w-16 h-16 mx-auto my-5"
            src="/team.png"
            alt="article-icone"
          />
          <p className="text-center font-bold">6</p>
          <h3 className="text-center">Members</h3>
        </section>
      </div>
    </>
  );
}

export default dashboard;
