import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/components/Context/LanguageContext";
import { FiEdit, FiTrash } from "react-icons/fi"; // Importation des icônes
import Loading from "@/components/Loading"; // Importation du composant de chargement

function ModifierUtilisateur() {
  const language = useContext(LanguageContext).language;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited
  const [editedUser, setEditedUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" }); // Track success/error message
  const [error, setError] = useState(null); // Track error message

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getUsers.php`
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {

      setMessage({
        text: "An error occurred while fetching users.",
        type: "error",
      });

    } finally {

      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteUser.php`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        setMessage({ text: "User deleted successfully", type: "success" });
      } else {
        setMessage({ text: "Failed to delete the user", type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred while deleting the user",
        type: "error",
      });
    }
  };

  const editUser = (user) => {
    setEditingUserId(user.id); // Start editing this user
    setEditedUser({ username: user.username, password: user.password }); // Pre-fill the inputs with current values
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const confirmEdit = async () => {
    const { username, password } = editedUser;
    if (!username || !password) {
      setMessage({ text: "Username and password are required", type: "error" });
      return;
    }

    const updatedUser = {
      id: editingUserId,
      username,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/editUser.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        setMessage({ text: `Error: ${response.statusText}`, type: "error" });
        return;
      }

      const text = await response.text();
      if (text.trim() === "") {
        setMessage({
          text: "An empty response was returned from the server.",
          type: "error",
        });
        return;
      }

      let data;
      try {
        data = JSON.parse(text); // Attempt to parse the response as JSON
      } catch (e) {
        setMessage({
          text: "An error occurred: Invalid response from server",
          type: "error",
        });
        return;
      }

      if (data.success) {
        setUsers(
          users.map((user) => (user.id === editingUserId ? updatedUser : user))
        );
        setMessage({ text: "User updated successfully", type: "success" });
        setEditingUserId(null); // End editing
      } else {
        setMessage({ text: `Error: ${data.message}`, type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred while updating the user",
        type: "error",
      });
    }
  };

  const cancelEdit = () => {
    setEditingUserId(null); // End editing without saving changes
  };

  // Auto-hide the message after 4 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  
  if (loading) return <div className='ml-20'><Loading/></div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-52 mt-20">
        <h1 className="text-3xl font-bold text-center mb-8">
    {language === "fr" ? "Tous les utilisateurs" : "All Users"}
  </h1>
      {/* Message bar */}
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
        onClick={() => (window.location.href = "/admin_pages/ajouterUtilisateur")}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        {language === "fr" ? "Ajouter Utilisateur" : "Add User"}
      </button>
      <table className="min-w-full mt-2 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-black h-14 text-white text-center">
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Password</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-t  hover:bg-gray-100 h-16">
              <td className="py-2 px-4 border-b ">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingUserId === user.id ? (
                  <input
                    type="password"
                    name="password"
                    value={editedUser.password}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  user.password
                )}
              </td>
              <td className="py-2 px-4 border-b flex">
                {editingUserId === user.id ? (
                  <>
                    <button
                      onClick={confirmEdit}
                      className="text-green-500 hover:text-green-700 mx-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700 mx-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => editUser(user)}
                      className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700 mx-2"
                    >
                      <FiTrash size={20} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModifierUtilisateur;
