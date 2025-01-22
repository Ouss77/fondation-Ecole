import { LanguageContext } from "@/components/Context/LanguageContext";
import { statusData } from "@/data/statusData"; // Import your rules and regulations data
import { useContext } from "react";
import Head from "next/head"; // Import Head for SEO optimization

export default function StatusPage() {
  const { language } = useContext(LanguageContext);

  // Dynamic description for rules and regulations
  const pageDescription = language === "fr"
    ? "Découvrez les statuts et règlements de l'AF3M, comprenant les articles détaillant les règles et les obligations de l'association."
    : "Explore the statutes and regulations of the AF3M, including articles detailing the rules and obligations of the association.";

  return (
    <>
      <Head>
        <title>{language === "fr" ? "Statuts et Règlements - AF3M" : "Rules and Regulations - AF3M"}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={language === "fr" ? "Statuts et Règlements - AF3M" : "Rules and Regulations - AF3M"} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://af3m-assoc.org/status" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
      </Head>

      <div className="px-4 w-11/12 sm:px-6 box-border mx-auto pt-32">
        {statusData.map((section, index) => (
          <section
            key={index}
            className="mb-6 sm:mb-8 md:mb-12 p-6 sm:p-8 md:p-10 bg-gray-100 rounded-lg shadow-md"
          >
            {/* Title rendering based on language */}
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-800">
              {section.title[language]} {/* Dynamically render title */}
            </h2>

            <ul className="list-none space-y-2 text-base sm:text-lg md:text-lg">
              {section.articles.map((article) => (
                <li key={article.number}>
                  <p className="font-bold mb-2 sm:mb-3 md:mb-4">
                    {language === "fr" ? `Article ${article.number}` : `Article ${article.number}`}
                  </p>
                  <div className="space-y-2">
                    {article.content.map((line, idx) => (
                      <div key={idx} className="flex items-start">
                        {/* Display content based on language selection */}
                        <p className="leading-7 text-base sm:leading-8 md:leading-9">
                          {language === "fr" ? line.fr : line.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
