import React from "react";
import { useLogin } from "./Context/AuthContext";

function Logout() {
  const { logout } = useLogin();
  return (
    <div>
      <button
        onClick={logout}
        className="py-3 pl-8 text-left text-lg font-semibold hover:bg-red-400 rounded-lg w-full hover:text-white 
          transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:scale-90"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
 