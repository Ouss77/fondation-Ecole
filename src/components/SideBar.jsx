import Link from "next/link";
import Logout from "./Logout";
import SwitchLanguage from "./SwitchLanguage";
import { useContext, useState } from "react";
import { LanguageContext } from "./Context/LanguageContext";
import { Menu, X, House } from "lucide-react";
import { useRouter } from "next/router";

function SideBar() {
  const language = useContext(LanguageContext).language;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden absolute top-5 left-5 text-white bg-blue-700 p-2 rounded-full shadow-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-700 to-purple-900 text-white shadow-lg pt-24 
        transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 lg:w-72 z-50 flex flex-col justify-between`} // Add flex layout here
      >
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">
              {language === "fr" ? "Admin Page" : "Admin Dashboard"}
            </h1>
            <div className="w-full border-t-4 border-gray-300 mb-6"></div>
          </div>

          <nav className="flex flex-col">
            <div className="flex items-center space-x-2 pl-8 py-3 hover:bg-blue-400 rounded-lg hover:text-white transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:scale-90">
              <House size={24} />
              <SidebarButton
                label={language === "fr" ? "Accueil" : "Home"}
                link="/"
                setIsOpen={setIsOpen}
              />
            </div>

            <SidebarButton
              label={language === "fr" ? "Tableau de Bord" : "Dashboard"}
              link="/admin_pages/dashboard"
              setIsOpen={setIsOpen}
            />
            <SidebarButton
              label={language === "fr" ? "Gestion des Articles" : "Manage Articles"}
              link="/admin_pages/modifierArticle"
              setIsOpen={setIsOpen}
            />
        
            <SidebarButton
              label={language === "fr" ? "Gestion des Actualités" : "Manage News"}
              link="/admin_pages/modifierActualite"
              setIsOpen={setIsOpen}
            />
                  <SidebarButton
              label={language === "fr" ? "Gestion des utilisateur" : "Manage Users"}
              link="/admin_pages/modifierUtilisateur"
              setIsOpen={setIsOpen}
            />

            {/* Logout */}
            <Logout />

            <div className="bg-pink-200 w-28 rounded mt-5 ml-10">
              <SwitchLanguage />
            </div>
          </nav>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              © 2024 | Developed by   
              <a href="https://www.linkedin.com/in/oussama-sassour/" target="_blank" className="text-blue-400 ml-1 hover:text-blue-500 font-semibold">
                Oussama Sassour
              </a>
            </p>
          </div>
        </footer>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

// Reusable Button Component
const SidebarButton = ({ label, link, setIsOpen }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(false); // Close sidebar
    router.push(link); // Navigate to the page
  };

  return (
    <button
      onClick={handleClick}
      className="py-3 px-5 pl-8 text-left text-lg font-semibold hover:bg-blue-400 rounded-lg hover:text-white 
          transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:scale-90"
    >
      {label}
    </button>
  );
};

export default SideBar;
