import React from 'react';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-500 text-black py-8 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - About Section */}
        <div>
            <Image src="/afm-logo.png" width={150} height={200} alt="Logo" className="rounded-lg" />
          <p className="mt-4 text-sm">
          Association Franco-Maghrébine
          de Mécanique et des Matériaux (AF3M)          </p>
          <a href="#" className="mt-4 inline-block text-yellow-500 hover:underline">
            CONDITIONS GÉNÉRALES DES DONATIONS
          </a>
        </div>

        {/* Right Side - Contact Section */}
        <div>
          <h2 className="text-4xl text-yellow-600  font-bold">Contactez-Nous</h2>
          <div className="mt-4">
            <p className="flex items-center">
              <span className="mr-2">📧</span>
              <a href="mailto:contact@jadara.foundation" className="hover:underline">
                contact@jadara.foundation
              </a>
            </p>
            <p className="flex items-center mt-2">
              <span className="mr-2">📍</span>
              Casablanca - Maroc - Ecole des Mines de Rabat
            </p>
            <p className="flex items-center mt-2">
              <span className="mr-2">📞</span>
              <a href="tel:+212522861880" className="hover:underline">
                +212 666 444 222
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
