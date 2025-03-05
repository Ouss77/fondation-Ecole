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
      <div className="lg:hidden  bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-700 border-t shadow-lg p-6">
        <nav className="space-y-6">
          <Link
            href="/actualites"
            className="block text-lg text-black hover:text-yellow-600 transition rounded-lg duration-300 ease-in-out transform hover:scale-110 font-medium"
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
            className="block text-lg text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
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
          <div className="relative">
            <button
            aria-label="Language Dropdown"
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
              <div className="absolute left-0 -mt-12 w-32 bg-white border border-gray-200 rounded shadow-lg">
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
                arialabel="English"
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
        </nav>
      </div>
    </div>
  );
}

export default Hamburger;