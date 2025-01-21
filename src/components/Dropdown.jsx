import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

const Dropdown = ({ label, items, openDropdown, toggleDropdown, dropdownKey }) => {
  const handleItemClick = () => {
    toggleDropdown(dropdownKey); // Close the dropdown after clicking an item
  };

  return (
    <div className="relative group">
      <button
        onClick={() => toggleDropdown(dropdownKey)}
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
              onClick={handleItemClick} // Close the dropdown on item click
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
