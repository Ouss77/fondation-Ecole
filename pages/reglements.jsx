import { statusData } from "@/data/statusData";

export default function StatusPage() {
  return (
    <div className="mx-56 pt-56 ">

      {statusData.map((section, index) => (
        <section
          key={index}
          className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md px-20"
        >
                <h1 className="text-4xl text-yellow-600 font-bold mb-20">
        Statuts et Règlement Intérieur
      </h1>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            {section.title}
          </h2>
          <ul className="list-none space-y-4 text-xl">
            {section.articles.map((article) => (
              <li key={article.number}>
                <p className="font-bold mb-4 ">Article {article.number} :</p>
                <div className="space-y-2">
                  {article.content.map((line, idx) => (
                    <div key={idx} className="flex items-start">
                      <p className="leading-10">{line}</p>
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
