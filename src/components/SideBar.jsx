import Link from 'next/link';
import Logout from './Logout';
import SwitchLanguage from './SwitchLanguage';

function SideBar() {
  return (
    <div className="w-64 mr-24 h-screen fixed left-0 top-0  bg-gradient-to-b from-blue-700 to-purple-900 text-white pt-36 shadow-lg">
      {/* Logo or Title */}
      <div className="flex flex-col items-center mt-1">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="w-full border-t-4 border-gray-300 mb-6"></div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col">
        <SidebarButton label="Dashboard" link="/admin_pages/dashboard" />
        <SidebarButton label="Gestion des Articles" link="/admin_pages/modifierArticle" />
        <SidebarButton label="Gestion des Actualité" link="/admin_pages/modifierActualite" />
        {/* <SidebarButton label="Change Password" link="/change-password" /> */}
       <Logout />
       <div className='bg-pink-200 w-28 rounded mt-5 ml-10'>       <SwitchLanguage />
       </div>
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

   
