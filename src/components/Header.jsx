"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMdMenu } from "react-icons/io";
import Dropdown from "./Dropdown";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Hamburger";
import { LanguageContext } from "./Context/LanguageContext";
import SwitchLanguage from "./SwitchLanguage";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const af3mDropdownRef = useRef(null);
  const conferencesDropdownRef = useRef(null);
  const adhesionDropdownRef = useRef(null);
  const mobileDropdownRefs = useRef({});
  const { language, switchLanguage } = useContext(LanguageContext);

  const handleClickOutside = (event) => {
    // Handle desktop dropdowns
    const desktopDropdownRefs = [af3mDropdownRef, conferencesDropdownRef, adhesionDropdownRef];
    
    const clickedInsideDesktopDropdown = desktopDropdownRefs.some((ref) => 
      ref.current && ref.current.contains(event.target)
    );
    
    // Handle mobile dropdowns
    const clickedInsideMobileDropdown = menuOpen && Object.values(mobileDropdownRefs.current).some((ref) => 
      ref && ref.contains(event.target)
    );
    
    // Close dropdowns if clicked outside
    if (!clickedInsideDesktopDropdown && !clickedInsideMobileDropdown) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const translations = {
    fr: {
      af3m: "L'AF3M",
      conferences: "Conférences organisées",
      adhesion: "Adhésion",
      af3mItems: [
        { label: "Historique et missions", href: "/AF3M_pages/historique" },
        { label: "Administration actuelle", href: "/AF3M_pages/Administration" },
        { label: "Anciens bureaux de l'AF3M", href: "/AF3M_pages/anciensBureau" },
        { label: "Status et règlement intérieur", href: "/AF3M_pages/reglements" },
      ],
      confItems: [
        { label: "JET (2000-2022)", href: "/conference_pages/conferenceJet" },
        { label: "Congrès international de mécanique", href: "/conference_pages/congreIntrMeca" },
      ],
      adhesionItems: [
        { label: "Devenir membre de l'AF3M", href: "/Adhesion_pages/devenirMembre" },
        { label: "Equipes et laboratoires de recherche", href: "/Adhesion_pages/equipesLaboratoire" },
      ],
    },
    en: {
      af3m: "AF3M",
      conferences: "Conferences organized",
      adhesion: "Membership",
      af3mItems: [
        { label: "History and Missions", href: "/AF3M_pages/historique" },
        { label: "Current Administration", href: "/AF3M_pages/Administration" },
        { label: "Former AF3M Offices", href: "/AF3M_pages/anciensBureau" },
        { label: "Statutes and Internal Regulations", href: "/AF3M_pages/reglements" },
      ],
      confItems: [
        { label: "JET (2000-2022)", href: "/conference_pages/conferenceJet" },
        { label: "International Mechanics Congress", href: "/conference_pages/congreIntrMeca" },
      ],
      adhesionItems: [
        { label: "Become an AF3M Member", href: "/Adhesion_pages/devenirMembre" },
        { label: "Research Teams and Laboratories", href: "/Adhesion_pages/equipesLaboratoire" },
      ],
    },
  };



  return (
    <header className="bg-blue-100 fixed z-50 w-full  backdrop-blur-sm shadow-2xl border-b border-blue-200/30 h-20">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 xl:px-20 h-full font-sans">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="transition-transform duration-300 hover:scale-105">
            <Image
              src="/img/afm-logo.png" 
              width={90}
              height={90}
              alt="AF3M Logo"
              priority={true}
              className="rounded-lg shadow-lg border-2 border-blue-300/50 hover:border-blue-400 transition-all duration-300"
            />
          </Link>
        </div>

        {/* Navbar Links (Desktop version) */}
        <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
          <Link
            href="/actualites"
            className="relative text-sm xl:text-base text-slate-700 hover:text-blue-600 transition-all duration-300 ease-in-out font-semibold group px-3 py-2 rounded-lg hover:bg-white/50"
          >
            {language === "fr" ? "Actualités" : "News"}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Dropdown
            label={translations[language].af3m}
            dropdownKey="af3m"
            dropdownRef={af3mDropdownRef}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={translations[language].af3mItems}
          />

          <Dropdown
            label={translations[language].conferences}
            dropdownKey="conferences"
            dropdownRef={conferencesDropdownRef}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={translations[language].confItems}
          />

          <Link
            href="/JetCommunication/communications"
            className="relative text-sm xl:text-base text-slate-700 hover:text-blue-600 transition-all duration-300 ease-in-out font-semibold group px-3 py-2 rounded-lg hover:bg-white/50"
          >
            {language === "fr" ? "Communications des éditions du jet" : "Communications of the jet editions"}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Dropdown
            label={translations[language].adhesion}
            dropdownKey="adhesion"
            dropdownRef={adhesionDropdownRef}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={translations[language].adhesionItems}
          />
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <SwitchLanguage />

          {/* Burger Button for Mobile */}
          <button  
            aria-label="Menu"
            onClick={toggleMenu} 
            className="lg:hidden bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <IoMdMenu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-t border-slate-700" >
        <Hamburger 
          translations={translations[language]}
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          dropdownRefs={mobileDropdownRefs}
          dropdownItemsAf3m={translations[language].af3mItems}
          dropdownItemsConf={translations[language].confItems}
          dropdownItemsAdhesion={translations[language].adhesionItems}
          language={language}
          switchLanguage={switchLanguage}
        />
        </div>
      )}
    </header>
  );
};

export default Navbar;