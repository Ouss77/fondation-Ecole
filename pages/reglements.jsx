import { statusData } from "@/data/statusData";

export default function StatusPage() {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-52">
      <h1 className="text-3xl sm:text-4xl md:text-4xl text-yellow-600 font-bold mb-8 sm:mb-12 md:mb-16">
        Statuts et Règlement Intérieur
      </h1>
      {statusData.map((section, index) => (
        <section
          key={index}
          className="mb-6 sm:mb-8 md:mb-12 p-6 sm:p-8 md:p-10 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-blue-700">
            {section.title}
          </h2>
          <ul className="list-none space-y-4 text-base sm:text-lg md:text-xl">
            {section.articles.map((article) => (
              <li key={article.number}>
                <p className="font-bold mb-2 sm:mb-3 md:mb-4">Article {article.number} :</p>
                <div className="space-y-2">
                  {article.content.map((line, idx) => (
                    <div key={idx} className="flex items-start">
                      <p className="leading-7 sm:leading-8 md:leading-9">{line}</p>
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
