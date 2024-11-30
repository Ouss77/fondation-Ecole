"use client"
import React, { useState } from "react";
import { FaChevronDown, FaGlobe } from "react-icons/fa"; // For dropdown and language icons
import { IoMdMenu } from "react-icons/io"; // For hamburger menu
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the state of the menu (open/close)
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gradient-to-r fixed z-50 w-full from-blue-200 via-indigo-300 to-purple-700 shadow-xl border-b h-30"> 
      <div className="flex justify-between items-center p-4 font-sans">        
        {/* Logo */}
        <div className="text-4xl font-extrabold text-white flex items-center">
          <Link href="/">
            <Image src="/afm-logo.png" width={150} height={150} alt="Logo" className="rounded-lg"/>
          </Link>
        </div>

        {/* Navbar Links */}
        <nav className="hidden lg:flex space-x-12">
          <Link
            href="/actualites"
            className="text-xl text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            Actualités
          </Link>

          {/* Dropdown for L'AF3M */}
          <div className="relative group">
            <button
              className="text-xl text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              L'AF3M <FaChevronDown className="ml-2 text-black" />
            </button>
            <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 transform scale-95 group-hover:scale-100">
              <Link href="/historique" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Historique et missions
              </Link>
              <Link href="/participantsPage" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Administration actuelle
              </Link>
              <Link href="/anciensBureau" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Anciens bureaux de l'AF3M
              </Link>
              <Link href="/reglements" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Status et règlement intérieur
              </Link>
            </div>
          </div>

          {/* Dropdown for Conférences */}
          <div className="relative group">
            <button
              className="text-xl text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              Conférences organisees et sponsorisees <FaChevronDown className="ml-2 text-black" />
            </button>
            <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 transform scale-95 group-hover:scale-100">
              <Link href="/conferenceJet" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                JET(2000-2022)
              </Link>
              <Link href="/congreIntrMeca" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Congres internationl de mecanique
              </Link>
            </div>
          </div>

          <Link
            href="/communications"
            className="text-xl text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            Communications des editions du jet
          </Link>
          <div className="relative group">
            <button
              className="text-xl text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              Adhésion <FaChevronDown className="ml-2 text-black" />
            </button>
            <div className="absolute z-50 top-full w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 -ml-40 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 transform scale-95 group-hover:scale-100">
              <Link href="/devenir-membre" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Devenir membre de l'AF3M
              </Link>
              <Link href="/equipes-laboratoires" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                Equipes, laboratoires de recherche des memebres de l'AF3M
              </Link>
            </div>
          </div>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center space-x-5">
          <button className="text-black hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">
            <FaGlobe />
          </button>
          <button className="text-black hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">
            <FaChevronDown />
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button onClick={toggleMenu} className="lg:hidden text-white hover:text-yellow-600">
          <IoMdMenu size={26} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 border-t shadow-lg">
          <nav className="space-y-6 p-6">
            <Link
              href="/actualites"
              className="block text-xl text-black hover:bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              Actualités
            </Link>
            <div className="relative group">
              <button
                className="block text-xl text-black hover:bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              >
                L'AF3M <FaChevronDown className="ml-2 text-black" />
              </button>
              <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 transform scale-95 group-hover:scale-100">
                <Link href="/historique" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Historique et missions
                </Link>
                <Link href="/participantsPage" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Administration actuelle
                </Link>
                <Link href="/anciensBureau" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Anciens bureaux de l'AF3M
                </Link>
                <Link href="/reglements" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Status et règlement intérieur
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button
                className="block text-xl text-black hover:bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              >
                Conférences <FaChevronDown className="ml-2 text-black" />
              </button>
              <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 transform scale-95 group-hover:scale-100">
                <Link href="/conferenceJet" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  JET(2000-2022)
                </Link>
                <Link href="/congreIntrMeca" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Congres internationl de mecanique
                </Link>
              </div>
            </div>
            <Link
              href="/communications"
              className="block text-xl text-black hover:bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              Communications
            </Link>
            <div className="relative group">
              <button
                className="block text-xl text-black hover:bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              >
                Adhésion <FaChevronDown className="ml-2 text-black" />
              </button>
              <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 transform scale-95 group-hover:scale-100">
                <Link href="/devenirMembre" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Devenir membre de l'AF3M
                </Link>
                <Link href="/equipes-laboratoires" className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500">
                  Equipes, laboratoires de recherche des memebres de l'AF3M
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;