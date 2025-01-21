import React from 'react'

function Hamburger() {
  return (
    <div>
                <div className="lg:hidden bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-700 border-t shadow-lg p-6">
          <nav className="space-y-6">
            <Link
              href="/actualites"
              className="block text-lg text-black hover:text-yellow-600 transition rounded-lg duration-300 ease-in-out transform hover:scale-110 font-medium"
              onClick={closeMenu}
            >
              Actualités
            </Link>

            {/* Mobile Dropdowns */}
            <Dropdown
              label="L'AF3M"
              dropdownKey="af3m"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              items={dropdownItemsAf3m}
              dropdownRef={(el) => (dropdownRefs.current["af3m"] = el)} // Add ref for this dropdown
            />

            <Dropdown
              label="Conférences"
              dropdownKey="conferences"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              items={dropdownItemsConf}
              dropdownRef={(el) => (dropdownRefs.current["conferences"] = el)} // Add ref for this dropdown
            />

            <Link
              href="/communications"
              className="block text-lg text-black hover:text-yellow-600 transition duration-300 ease-in-out transform hover:scale-110 font-medium"
              onClick={closeMenu}
            >
              Communications
            </Link>

            <Dropdown
              label="Adhésion"
              dropdownKey="adhesion"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              items={dropdownItemsAdhesion}
              dropdownRef={(el) => (dropdownRefs.current["adhesion"] = el)} // Add ref for this dropdown
            />
          </nav>
        </div>
    </div>
  )
}

export default Hamburger