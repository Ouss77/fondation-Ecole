"use client";
import React, { useState, useEffect, useRef, useContext } from "react";

import { FaChevronDown, FaGlobe } from "react-icons/fa"; // For dropdown and language icons
import { IoMdMenu } from "react-icons/io"; // For hamburger menu
import Dropdown from "./Dropdown";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Hamburger";
import { LanguageContext } from "./Context/LanguageContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks the currently open dropdown
  const dropdownRefs = useRef({}); // Ref to store dropdown references

  const { language, switchLanguage } = useContext(LanguageContext);

  // Close the menu on click outside the dropdown
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdowns
    Object.values(dropdownRefs.current).forEach((dropdownRef) => {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        setOpenDropdown(null); // Close dropdown if clicked outside
      }
    });
  };

  // Event listener to detect clicks outside the dropdowns
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle dropdowns for mobile
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => setMenuOpen(false);

  const dropdownItemsAf3m = [
    { label: "Historique et missions", href: "/AF3M_pages/historique" },
    { label: "Administration actuelle", href: "/AF3M_pages/Administration" },
    { label: "Anciens bureaux de l'AF3M", href: "/AF3M_pages/anciensBureau" },
    { label: "Status et règlement intérieur", href: "/AF3M_pages/reglements" },
  ];

  const dropdownItemsConf = [
    { label: "JET(2000-2022)", href: "/conference_pages/conferenceJet" },
    { label: "Congres internationl de mecanique",      href: "/conference_pages/congreIntrMeca" },
  ];

  const dropdownItemsAdhesion = [
    {
      label: "Devenir membre de l'AF3M",
      href: "/Adhesion_pages/devenirMembre",
    },
    {
      label: "Equipes etlaboratoires de recherche",
      href: "/Adhesion_pages/equipesLaboratoire",
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <header className="bg-gradient-to-r fixed z-50 w-full from-white via-blue-100 to-blue-200 shadow-xl border-b h-24">
      <div className="flex justify-center items-center p-2 font-sans">
        {/* Logo */}
        <div className="mr-40 text-white">
          <Link href="/">
            <Image
              src="/img/afm-logo.png"
              width={110}
              height={110}
              alt="Logo"
              className="rounded-l-xl border-2 border-yellow-900"
            />
          </Link>
        </div>

        {/* Navbar Links (Desktop version) */}
        <nav className="hidden lg:flex space-x-12">
          <Link
            href="/actualites"
            className="text-base text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            Actualités
          </Link>

          {/* Dropdowns */}
          <Dropdown
            label="L'AF3M"
            dropdownKey="af3m"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={dropdownItemsAf3m}
            dropdownRef={(el) => (dropdownRefs.current["af3m"] = el)} // Add ref for this dropdown
          />

          <Dropdown
            label="Conférences organisees et sponsorisees"
            dropdownKey="conferences"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={dropdownItemsConf}
            dropdownRef={(el) => (dropdownRefs.current["conferences"] = el)} // Add ref for this dropdown
          />

          <Link
            href="JetCommunication/communications"
            className="text-base text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            Communications des editions du jet
          </Link>

          <Dropdown
            label="Adhésion"
            dropdownKey="adhesion"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            items={dropdownItemsAdhesion}
            dropdownRef={(el) => (dropdownRefs.current["adhesion"] = el)} // Add ref for this dropdown
          />
        </nav>

        <div className="relative text-center ml-10">
      <button onClick={handleOpen} className="flex items-center border-l px-4 py-2  rounded hover:bg-gray-300 font-medium">
        Languages
        <span className={`ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
          <FaChevronDown />
        </span>
      </button>
      <div
        className={`absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          className={`w-full text-left px-4 py-2 rounded-t hover:bg-gray-100 ${
            language === "fr" ? "bg-yellow-600 text-white" : "bg-white text-black"
          }`}
          onClick={() =>{handleOpen(); switchLanguage("fr")} }
        >
          <span className="flex items-center">
            <Image src="/img/france.png" width={20} height={20} className="mr-2" alt="French" />
            French
          </span>
        </button>
        <button
          className={`w-full text-left px-4 py-2 rounded-b hover:bg-gray-100 ${
            language === "en" ? "bg-yellow-600 text-white" : "bg-white text-black"
          }`}
          onClick={() =>{handleOpen(); switchLanguage("en")} }
        >
          <span className="flex items-center">
            <Image src="/img/uk.png" width={20} height={20} className="mr-2" alt="English" />
            English
          </span>
        </button>
      </div>
    </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white hover:text-yellow-600"
        >
          <IoMdMenu size={26} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && <Hamburger />}
    </header>
  );
};

export default Navbar;

