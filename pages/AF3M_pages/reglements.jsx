import { LanguageContext } from "@/components/Context/LanguageContext";
import { statusData } from "@/data/statusData";
import { useContext, useState } from "react";
import Head from "next/head";
import { FiChevronDown, FiChevronUp, FiFileText } from "react-icons/fi";
import { FaBalanceScale, FaBook, FaGavel } from "react-icons/fa";
import React from "react";
export default function StatusPage() {
  const { language } = useContext(LanguageContext);

  const pageDescription = language === "fr"
    ? "Découvrez les statuts et règlements de l'AF3M, comprenant les articles détaillant les règles et les obligations de l'association."
    : "Explore the statutes and regulations of the AF3M, including articles detailing the rules and obligations of the association.";

  const pageContent = {
    title: {
      fr: "Statuts et Règlement Intérieur",
      en: "Statutes and Internal Regulations"
    },
    subtitle: {
      fr: "Cadre légal et réglementaire de l'AF3M",
      en: "Legal and Regulatory Framework of AF3M"
    },
    stats: [
      {
        icon: <FaBook className="w-5 h-5" />,
        labelFr: "Sections",
        labelEn: "Sections",
        value: statusData.length
      },
      {
        icon: <FaGavel className="w-5 h-5" />,
        labelFr: "Articles",
        labelEn: "Articles",
        value: statusData.reduce((acc, section) => acc + section.articles.length, 0)
      },
      {
        icon: <FaBalanceScale className="w-5 h-5" />,
        labelFr: "Conformité",
        labelEn: "Compliance",
        value: "100%"
      }
    ]
  };

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

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          
{/* Header Section */}
<div className="text-center mb-12">
  <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500 mb-3">
    {pageContent.title[language]}
  </h1>
  <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full mx-auto mb-4" />
  <p className="text-xl text-gray-600 font-medium">
    {pageContent.subtitle[language]}
  </p>
</div>

{/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
  {pageContent.stats.map((stat, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 text-center group hover:border-yellow-400"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
        {React.cloneElement(stat.icon, { className: "w-4 h-4" })} 
        {/* réduit la taille de l'icône */}
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">
        {stat.value}
      </p>
      <p className="text-sm text-gray-600">
        {language === "fr" ? stat.labelFr : stat.labelEn}
      </p>
    </div>
  ))}
</div>


          {/* Sections */}
          <div className="space-y-6">
            {statusData.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                {/* Section Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FiFileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {section.title[language]}
                    </h2>
                  </div>
                </div>

                {/* Articles List */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {section.articles.map((article) => (
                      <Article key={article.number} article={article} language={language} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Info Footer */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-md">
                <FaBalanceScale className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {language === "fr" ? "Documents Officiels" : "Official Documents"}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {language === "fr" 
                    ? "Ces statuts et règlements constituent le cadre juridique et organisationnel de l'Association Franco-Maghrébine de Mécanique et des Matériaux (AF3M). Ils définissent les règles de fonctionnement et les obligations de tous les membres."
                    : "These statutes and regulations constitute the legal and organizational framework of the Franco-Maghreb Association of Mechanics and Materials (AF3M). They define the operating rules and obligations of all members."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Article({ article, language }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="border border-gray-200 rounded-xl overflow-hidden hover:border-yellow-400 transition-all duration-300">
      <div
        className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={toggleVisibility}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {article.number}
          </div>
          <p className="font-semibold text-gray-800">
            {language === "fr" ? `Article ${article.number}` : `Article ${article.number}`}
          </p>
        </div>
        
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <FiChevronDown className="h-5 w-5 text-gray-700" />
        </div>
      </div>

      {/* Content with smooth animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 bg-white space-y-3">
          {article.content.map((line, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-700 leading-relaxed text-base">
                {language === "fr" ? line.fr : line.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}