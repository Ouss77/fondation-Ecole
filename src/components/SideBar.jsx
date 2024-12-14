import Link from 'next/link';

function SideBar() {
  return (
    <div className="w-72 mr-20 h-screen bg-gradient-to-b from-blue-700 to-purple-900 text-white pt-36 shadow-lg">
      {/* Logo or Title */}
      <div className="flex flex-col items-center mt-1">
        <h1 className="text-2xl font-bold mb-6">Adminxx Dashboard</h1>
        <div className="w-full border-t-4 border-gray-300 mb-6"></div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col">
        <SidebarButton label="Dashboard" link="/admin_pages/dashboard" />
        <SidebarButton label="Ajouter Article" link="/admin_pages/ajouterArticle" />
        <SidebarButton label="Ajouter Actualité" link="/admin_pages/ajouterActualite" />
        <SidebarButton label="Change Password" link="/change-password" />
        <SidebarButton label="Déconnexion" link="/logout" />
      </nav>
    </div>
  );
}

// Reusable Button Component
const SidebarButton = ({ label, link }) => {
  return (
    <Link href={link} className="py-3 pl-8 text-left text-lg font-semibold hover:bg-blue-400 rounded-lg hover:text-white 
          transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:scale-90">
      {label}
    </Link>
  );
};

export default SideBar;
