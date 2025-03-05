import React, { useContext, useState } from 'react'
import { FaChevronDown, FaGlobe } from "react-icons/fa";
import { LanguageContext } from './Context/LanguageContext';
import Image from 'next/image';

function SwitchLanguage() {
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { language, switchLanguage } = useContext(LanguageContext);
    
    const handleLanguageSwitch = (lang) => {
      switchLanguage(lang);
      setIsLanguageDropdownOpen(false);
    };

  return (
      <div className="hidden lg:flex relative">
      <button
        aria-label='Switch language'
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
        className="flex items-center border-l px-4 py-2 rounded hover:bg-gray-300 font-medium"
      >
        <Image src="/img/uk.png" width={20} height={20} className="mr-2" alt="English" /> / 
        <Image src="/img/france.png" width={20} height={20} className="ml-2" alt="France" />
        <span className={`ml-2 transition-transform ${isLanguageDropdownOpen ? "rotate-180" : "rotate-0"}`}>
          <FaChevronDown />
        </span>
      </button>

      {isLanguageDropdownOpen && (
        <div className="absolute  lg:-right-2 mt-0 w-32 bg-white border border-gray-200 rounded shadow-lg">
          <button 
            aria-label="French"
            className={`w-full text-left px-4 py-2 rounded-t hover:bg-gray-100 ${language === "fr" ? "bg-yellow-600 text-white" : "bg-white text-black"}`}
            onClick={() => handleLanguageSwitch("fr")}
          >
            <span className="flex items-center">
              <Image src="/img/france.png" width={20} height={20} className="mr-2" alt="French" />
              French
            </span>
          </button>
          <button
          aria-label='English'
            className={`w-full text-left px-4 py-2 rounded-b hover:bg-gray-100 ${language === "en" ? "bg-yellow-600 text-white" : "bg-white text-black"}`}
            onClick={() => handleLanguageSwitch("en")}
          >
            <span className="flex items-center">
              <Image src="/img/uk.png" width={20} height={20} className="mr-2" alt="English" />
              English
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default SwitchLanguage