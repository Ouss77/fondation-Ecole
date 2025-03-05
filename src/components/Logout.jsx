import React, { useContext } from "react";
import { useLogin } from "./Context/AuthContext";
import { LanguageContext } from "./Context/LanguageContext";

function Logout() {
  const language = useContext(LanguageContext).language;  
  const { logout } = useLogin();
  return (
    <div>
      <button
      aria-label="Logout"
        onClick={logout}
        className="py-3 pl-8 text-left text-lg font-semibold hover:bg-red-400 rounded-lg w-full hover:text-white 
          transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:scale-90"
      >
        {language === "fr" ? "Déconnexion" : "Logout"}
      </button>
    </div>
  );
}

export default Logout;
