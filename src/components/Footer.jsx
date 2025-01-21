import React, { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from './Context/LanguageContext';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="bg-gradient-to-r from-white via-indigo-100 to-blue-100 text-black py-8 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <Image src="/img/afm-logo.png" width={150} height={200} alt="Logo" className="rounded-l-xl border-2 border-yellow-900" />
          <p className="mt-4 text-sm">{ language=='fr' ? "Association Franco-Maghrébine de Mécanique et des Matériaux (AF3M)": "Franco-Maghreb Association of Mechanics and Materials (AF3M)"  }  </p>
          <a href="#" className="mt-4 inline-block text-yellow-500 hover:underline">
         {language == 'fr' ? "CONDITIONS GÉNÉRALES DES DONATIONS": "GENERAL CONDITIONS OF DONATIONS" }  
          </a>
        </div>

        {/* Right Side - Contact Section */}
        <div>
          <h2 className="text-4xl text-yellow-600  font-bold">{language == 'fr' ? "Contacter Nous": "Contact Us"}</h2>
          <div className="mt-4">
            <p className="flex items-center">
              <span className="mr-2">📧</span>
              <a href="mailto:contact@af3m.foundation" className="hover:underline">
                contact@association.foundation
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
