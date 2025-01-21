import { LanguageContext } from "@/components/Context/LanguageContext";
import { statusData } from "@/data/statusData";  // Import your status data
import { useContext } from "react";

export default function StatusPage() {
  const { language } = useContext(LanguageContext);

  return (
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
  );
}
