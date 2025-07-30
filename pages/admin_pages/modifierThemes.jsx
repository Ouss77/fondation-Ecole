import { useState, useEffect, useContext } from "react";
import Loading from "@/components/Loading";
import axios from "axios";
import { Pencil, Check, X, Tag, Plus } from "lucide-react";
import { LanguageContext } from "@/components/Context/LanguageContext";

function ModifierThemes() {
  const {language} = useContext(LanguageContext);
  const [themes, setThemes] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedThemeName, setEditedThemeName] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // Track success/error message
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch themes");
      console.error("Error fetching themes:", error);
    }
  };
  const updateTheme = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Themes/EditTheme.php`,
        {
          themeID: id,
          themeName: editedThemeName,
          _method: 'PUT' // This indicates it's an update operation
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
      setMessage({ 
        text: error.response?.data?.error || "Failed to edit the theme", 
        type: "error" 
      });
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

  
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-8 border border-white/20">
        <Loading/>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-8 border border-white/20">
        <div className="text-center text-red-600 py-10">Error: {error}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Success/Error Message */}
        {message.text && (
          <div
            className={`fixed top-0 left-0 w-full py-3 text-center text-white font-medium z-50 ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Header Section */}
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg mr-4">
              <Tag className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {language === "fr" ? "Gestion des Thèmes" : "Theme Management"}
              </h1>
              <p className="text-gray-600 font-medium mt-2">
                {language === "fr" ? "Gérez tous les thèmes d'articles" : "Manage all article themes"}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              aria-label="Add Theme"
              onClick={() => (window.location.href = "/admin_pages/ajouterTheme")}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              {language === "fr" ? "Ajouter un Thème" : "Add Theme"}
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                <tr>
                  <th className="w-1/6 px-6 py-4 text-left text-white font-semibold border-b border-gray-700">
                    ID
                  </th>
                  <th className="w-3/6 px-6 py-4 text-left text-white font-semibold border-b border-gray-700">
                    {language === "fr" ? "Nom du Thème" : "Theme Name"}
                  </th>
                  <th className="w-2/6 px-6 py-4 text-center text-white font-semibold border-b border-gray-700">
                    {language === "fr" ? "Actions" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/90">
                {themes.map((theme, index) => (
                  <tr key={theme.themeID} className={`border-b border-gray-200 hover:bg-blue-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      #{theme.themeID}
                    </td>
                    <td className="px-6 py-4">
                      {editMode === theme.themeID ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          value={editedThemeName}
                          onChange={(e) => setEditedThemeName(e.target.value)}
                          placeholder={language === "fr" ? "Nom du thème" : "Theme name"}
                        />
                      ) : (
                        <span className="text-gray-700 font-medium">{theme.themeName}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editMode === theme.themeID ? (
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => updateTheme(theme.themeID)}
                            className="group relative px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                          >
                            <Check size={16} className="mr-1" />
                            {language === "fr" ? "Sauver" : "Save"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="group relative px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                          >
                            <X size={16} className="mr-1" />
                            {language === "fr" ? "Annuler" : "Cancel"}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => enterEditMode(theme.themeID, theme.themeName)}
                          className="group relative px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center mx-auto"
                        >
                          <Pencil size={16} className="mr-1" />
                          {language === "fr" ? "Modifier" : "Edit"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {themes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                {language === "fr" ? "Aucun thème trouvé" : "No themes found"}
              </p>
              <p className="text-sm">
                {language === "fr" ? "Commencez par ajouter un nouveau thème" : "Start by adding a new theme"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModifierThemes;
