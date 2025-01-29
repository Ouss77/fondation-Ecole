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
  const dropdownRefs = useRef({});
  const { language, switchLanguage } = useContext(LanguageContext);

  const handleClickOutside = (event) => {
    Object.values(dropdownRefs.current).forEach((dropdownRef) => {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        setOpenDropdown(null);
      }
    });
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
    <header className="bg-gradient-to-r fixed z-50 w-full from-white via-blue-100 to-blue-200 shadow-xl mx-auto border-b h-24">
      <div className="flex justify-between items-center p-2 sm:px-20 font-sans">
        {/* Logo */}
        <div className="sm:mr-40 ml-0 text-white">
          <Link href="/">
            <Image
              src="/img/afm-logo.png" 
              width={110}
              height={110}
              alt="Logo"
              priority={true}
              className="rounded-r-md border-2 border-blue-900"
            />
          </Link>
        </div>

        {/* Navbar Links (Desktop version) */}
        <nav className="hidden lg:flex space-x-12">
          <Link
            href="/actualites"
            className="text-base text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            {language === "fr" ? "Actualités" : "News"}
          </Link>

          <Dropdown
            label={translations[language].af3m}
            dropdownKey="af3m"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={translations[language].af3mItems}
          />

          <Dropdown
            label={translations[language].conferences}
            dropdownKey="conferences"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={translations[language].confItems}
          />

          <Link
            href="/JetCommunication/communications"
            className="text-base text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            {language === "fr" ? "Communications des éditions du jet" : "Communications of the jet editions"}
          </Link>

          <Dropdown
            label={translations[language].adhesion}
            dropdownKey="adhesion"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={translations[language].adhesionItems}
          />
        </nav>

      <SwitchLanguage />

        {/* Burger Button for Mobile */}
        <button onClick={toggleMenu} className="lg:hidden text-white hover:text-yellow-600">
          <IoMdMenu size={26} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className=" border-blue-900  bg-black" >

   
        <Hamburger 
          translations={translations[language]}
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          dropdownRefs={dropdownRefs}
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