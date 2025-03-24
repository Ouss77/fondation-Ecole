import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function ajouterTheme() {
    const router = useRouter();
    const [themeName, setThemeName] = useState("");
    const [themes, setThemes] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });

    const addTheme = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Themes/AddTheme.php`,
                {
                    themeName: themeName
                }
            );
            setThemes([...themes, { themeName }]);
            setThemeName("");
            setMessage({ text: "Theme added Successfully", type: "success" });
            router.push("/admin_pages/modifierThemes");
        } catch (error) {
            setMessage({ text: "Failed to add the theme", type: "error" });
            console.error("Error adding theme:", error.response?.data || error.message);
        }
    }
return (
    <div className="min-h-screen mx-20 flex flex-col justify-center items-center">
              {message.text && (
        <div
          className={`fixed top-0 left-0 w-full py-2 text-center text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}
            <h1 className="text-3xl font-bold mb-6">Ajouter Theme</h1>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <input
                            type="text"
                            placeholder="Nom du theme"
                            className="w-full border-2 border-gray-300 p-3 mb-4 rounded-lg"
                            value={themeName}
                            onChange={(e) => setThemeName(e.target.value)}
                    />
                    <button
                            onClick={addTheme}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                            Ajouter Theme
                    </button>
            </div>
    </div>
)
}

export default ajouterTheme