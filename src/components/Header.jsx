"use client";
import React, { useState } from "react";
import { FaChevronDown, FaGlobe } from "react-icons/fa"; // For dropdown and language icons
import { IoMdMenu } from "react-icons/io"; // For hamburger menu
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(true); // Tracks the currently open navbar
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks the currently open dropdown

  // Toggle the state of the menu (open/close)
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleNavbar = () => setOpenNavbar(!openNavbar);
  // Toggle dropdowns for mobile
  const toggleDropdown = (dropdown) => {
    // Close the dropdown if it's already open, otherwise open the new one
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gradient-to-r fixed z-50 w-full from-blue-200 via-indigo-300 to-purple-700 shadow-xl border-b h-24 ">
      <div className="flex   justify-center items-center p-2  font-sans">
        {/* Logo */}
        <div className=" mr-40  text-white ">
          <Link href="/">
            <Image
              src="/afm-logo.png"
              width={110}
              height={110}
              alt="Logo"
              className="rounded-lg"
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

          {/* Dropdown for L'AF3M */}
          <div className="relative group ">
            <button
              onClick={() => toggleDropdown("af3m")}
              className="text-base text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              L'AF3M <FaChevronDown className="ml-2 text-black" />
            </button>
            {openDropdown === "af3m" && (
              <div className="absolute text-sm z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
                                <Link
                  onClick={() => toggleDropdown("af3m")}
                  href="/AF3M_pages/articales"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Articles
                </Link>
                <Link
                  onClick={() => toggleDropdown("af3m")}
                  href="/AF3M_pages/historique"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Historique et missions
                </Link>
                <Link
                  onClick={() => toggleDropdown("af3m")}
                  href="/AF3M_pages/Administration"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Administration actuelle
                </Link>
                <Link
                  onClick={() => toggleDropdown("af3m")}
                  href="/AF3M_pages/anciensBureau"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Anciens bureaux de l'AF3M
                </Link>
                <Link
                  onClick={() => toggleDropdown('af3m')}
                  href="/AF3M_pages/reglements"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Status et règlement intérieur
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Conférences */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("conferences")}
              className="text-base text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              Conférences organisees et sponsorisees{" "}
              <FaChevronDown className="ml-2 text-black" />
            </button>
            {openDropdown === "conferences" && (
              <div className="absolute text-sm z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
                <Link
                                onClick={() => toggleDropdown('tt')}

                  href="/conference_pages/conferenceJet"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  JET(2000-2022)
                </Link>
                <Link
                                onClick={() => toggleDropdown('tt')}

                  href="/conference_pages/congreIntrMeca"
                  className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Congres internationl de mecanique
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/communications"
            className="text-base text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
          >
            Communications des editions du jet
          </Link>
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("adhesion")}
              className="text-base text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
            >
              Adhésion <FaChevronDown className="ml-2 text-black" />
            </button>
            {openDropdown === "adhesion" && (
              <div className="absolute z-50 text-xs top-full -left-10 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
                <Link
                                onClick={() => toggleDropdown('xx')}

                  href="/Adhesion_pages/devenirMembre"
                  className="block px-3  py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Devenir membre de l'AF3M
                </Link>
                <Link
                                onClick={() => toggleDropdown('xx')}

                  href="/Adhesion_pages/equipesLaboratoire"
                  className="block px-3 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                >
                  Equipes, laboratoires de recherche de l'AF3M
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center ml-10">
          <button className="text-black hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">
            <FaGlobe />
          </button>
          <button className="text-black hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">
            <FaChevronDown />
          </button>
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
      {menuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-700 border-t shadow-lg p-6">
          <nav className="space-y-6">
            <Link
              href="/actualites"
              className="block text-lg text-black hover:text-yellow-600 transition rounded-lg duration-300 ease-in-out transform hover:scale-110 font-medium"
              onClick={closeMenu} // Close the menu when clicked
            >
              Actualités
            </Link>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("af3m")}
                className="block text-lg text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              >
                L'AF3M <FaChevronDown className="ml-2 text-black" />
              </button>
              {openDropdown === "af3m" && (
                <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
                  <Link
                    href="/AF3M_pages/historique"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Historique et missions
                  </Link>
                  <Link
                    href="/AF3M_pages/participantsPage"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Administration actuelle
                  </Link>
                  <Link
                    href="/AF3M_pages/anciensBureau"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Anciens bureaux de l'AF3M
                  </Link>
                  <Link
                    href="/AF3M_pages/reglements"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Status et règlement intérieur
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("conferences")}
                className="block text-lg text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              >
                Conférences <FaChevronDown className="ml-2 text-black" />
              </button>
              {openDropdown === "conferences" && (
                <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
                  <Link
                    href="/conference_pages/conferenceJet"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    JET(2000-2022)
                  </Link>
                  <Link
                    href="/conference_pages/congreIntrMeca"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Congres internationl de mecanique
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/communications"
              className="block text-lg text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              onClick={closeMenu} // Close the menu when clicked
            >
              Communications
            </Link>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("adhesion")}
                className="block text-lg text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              >
                Adhésion <FaChevronDown className="ml-2 text-black" />
              </button>
              {openDropdown === "adhesion" && (
                <div className="absolute z-50 top-full left-0 w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
                  <Link
                    href="/Adhesion_pages/devenirMembre"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Devenir membre de l'AF3M
                  </Link>
                  <Link
                    href="/Adhesion_pages/equipeslaboratoires"
                    className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
                    onClick={closeMenu} // Close the menu when clicked
                  >
                    Equipes, laboratoires de recherche de l'AF3M
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
