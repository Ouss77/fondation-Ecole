import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

const Dropdown = ({ label, dropdownRef, items, openDropdown, toggleDropdown, dropdownKey, toggleMenu }) => {
  const handleItemClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    toggleDropdown(dropdownKey); // Close the dropdown
    toggleMenu; // Close the burger menu
  };

  return (
    <div ref={dropdownRef} className="relative group">
      <button
      aria-label='Dropdown'
        onClick={(event) => {
          event.stopPropagation(); // Stop event propagation
          toggleDropdown(dropdownKey);
        }}
        className="text-base text-black hover:text-yellow-600 flex items-center transition duration-300 ease-in-out transform hover:scale-110 font-medium"
      >
        {label} <FaChevronDown className="ml-2 text-black" />
      </button>
      {openDropdown === dropdownKey && (
        <div className="absolute z-50 top-full lg:-left-[51px] w-max bg-white shadow-lg border border-gray-300 rounded-lg mt-3 opacity-100 translate-y-1 transition-all duration-500 transform scale-100">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="block px-5 py-3 text-blue-900 hover:bg-yellow-200 rounded-lg transition-colors duration-500"
              onClick={handleItemClick} // Close dropdown and burger menu on item click
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;