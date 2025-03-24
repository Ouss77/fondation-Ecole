import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Check, X } from "lucide-react";

function ModifierThemes() {
  const [themes, setThemes] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedThemeName, setEditedThemeName] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // Track success/error message

  useEffect(() => {
    getThemes();
  }, []);

  const getThemes = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Themes/getAllTheme.php`;
    console.log("Fetching from URL:", url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setThemes(data);
    } catch (error) {
      console.error("Error fetching themes:", error);
    }
  };

  const updateTheme = async (id) => {
    try {
        await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/Themes/EditTheme.php`,
            {
                themeID: id,  // ✅ Include the ID in the request body
                themeName: editedThemeName
            }
        );

        setThemes(
            themes.map((theme) =>
                theme.themeID === id ? { ...theme, themeName: editedThemeName } : theme
            )
        );
        
        setEditMode(null);
        setEditedThemeName("");
        setMessage({ text: "Theme modified Successfully", type: "success" });

    } catch (error) {
        setMessage({ text: "Failed to delete the user", type: "error" });

        console.error("Error updating theme:", error.response?.data || error.message);
    }
};

  const enterEditMode = (id, currentName) => {
    setEditMode(id); // Set only this ID in edit mode
    setEditedThemeName(currentName); // Pre-fill input with existing name
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditedThemeName("");
  };

  return (
    <div className="max-w-4xl m-32  p-6 bg-white shadow-lg rounded-lg">
         {message.text && (
        <div
          className={`fixed top-0 left-0 w-full py-2 text-center text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        aria-label="Add News"
        onClick={() => (window.location.href = "/admin_pages/ajouterTheme")}
        className="px-6 mb-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >Ajouter theme</button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/6 px-4 py-3 text-left text-gray-600 font-medium border-b">ID</th>
              <th className="w-3/6 px-4 py-3 text-left text-gray-600 font-medium border-b">
                Nom du Thème
              </th>
              <th className="w-2/6 px-4 py-3 text-left text-gray-600 font-medium border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme) => (
              <tr key={theme.themeID} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{theme.themeID}</td>
                <td className="px-4 py-3">
                  {editMode === theme.themeID ? (
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 w-full"
                      value={editedThemeName}
                      onChange={(e) => setEditedThemeName(e.target.value)}
                    />
                  ) : (
                    <span className="text-gray-700">{theme.themeName}</span>
                  )}
                </td>
                <td className="px-4 py-3 flex space-x-2">
                  {editMode === theme.themeID ? (
                    <>
                      <button
                        onClick={() => updateTheme(theme.themeID)}
                        className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 flex items-center"
                      >
                        <Check size={18} className="mr-1" /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 flex items-center"
                      >
                        <X size={18} className="mr-1" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => enterEditMode(theme.themeID, theme.themeName)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                    >
                      <Pencil size={18} className="mr-1" /> Modifier
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModifierThemes;
