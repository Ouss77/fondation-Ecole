import Link from "next/link";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

function Hamburger({
  translations,
  toggleMenu,
  menuOpen,
  openDropdown,
  toggleDropdown,
  dropdownRefs,
  dropdownItemsAf3m,
  dropdownItemsConf,
  dropdownItemsAdhesion,
  language,
  switchLanguage,
}) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLanguageSwitch = (lang) => {
    switchLanguage(lang);
    setIsLanguageDropdownOpen(false);
    toggleMenu(); // Close the burger menu when language is switched
  };

  return (
    <div>
      <div className="lg:hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 min-h-screen">
        <nav className="space-y-4">
          <Link
            href="/actualites"
            className="block text-lg text-white hover:text-blue-400 transition-all duration-300 ease-in-out font-semibold py-3 px-4 rounded-lg hover:bg-slate-700/50 border-l-4 border-transparent hover:border-blue-400"
            onClick={toggleMenu}
          >
            {language === "fr" ? "Actualités" : "News"}
          </Link>

          {/* Mobile Dropdowns */}
          <Dropdown
            label={translations.af3m}
            dropdownKey="af3m"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={dropdownItemsAf3m}
            dropdownRef={(el) => (dropdownRefs.current["af3m"] = el)}
            toggleMenu={toggleMenu} // Pass toggleMenu to close burger menu
          />

          <Dropdown
            label={translations.conferences}
            dropdownKey="conferences"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={dropdownItemsConf}
            dropdownRef={(el) => (dropdownRefs.current["conferences"] = el)}
            toggleMenu={toggleMenu} // Pass toggleMenu to close burger menu
          />

          <Link
            href="/JetCommunication/communications"
            className="block text-lg text-white hover:text-blue-400 transition-all duration-300 ease-in-out font-semibold py-3 px-4 rounded-lg hover:bg-slate-700/50 border-l-4 border-transparent hover:border-blue-400"
            onClick={toggleMenu}
          >
            {language === "fr" ? "Communications des éditions du jet" : "Communications of the jet editions"}
          </Link>

          <Dropdown
            label={translations.adhesion}
            dropdownKey="adhesion"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={dropdownItemsAdhesion}
            dropdownRef={(el) => (dropdownRefs.current["adhesion"] = el)}
            toggleMenu={toggleMenu} // Pass toggleMenu to close burger menu
          />

          {/* Language Switcher */}
          <div className="relative mt-6 pt-4 border-t border-slate-600">
            <button
              aria-label="Language Dropdown"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center w-full text-white hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-slate-700/50 font-semibold transition-all duration-300 border-l-4 border-transparent hover:border-blue-400"
            >
              <Image src="/img/uk.png" width={20} height={20} className="mr-2" alt="English" /> / 
              <Image src="/img/france.png" width={20} height={20} className="ml-2 mr-3" alt="France" />
              <span className="flex-1 text-left">Language</span>
              <span className={`transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : "rotate-0"}`}>
                <FaChevronDown />
              </span>
            </button>

            {isLanguageDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2 bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
                <button
                  aria-label="French"
                  className={`w-full text-left px-4 py-3 transition-all duration-200 ${language === "fr" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}
                  onClick={() => handleLanguageSwitch("fr")}
                >
                  <span className="flex items-center">
                    <Image src="/img/france.png" width={20} height={20} className="mr-3" alt="French" />
                    Français
                  </span>
                </button>
                <button
                  aria-label="English"
                  className={`w-full text-left px-4 py-3 transition-all duration-200 ${language === "en" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}
                  onClick={() => handleLanguageSwitch("en")}
                >
                  <span className="flex items-center">
                    <Image src="/img/uk.png" width={20} height={20} className="mr-3" alt="English" />
                    English
                  </span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Hamburger;