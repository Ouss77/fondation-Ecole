import React, { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from './Context/LanguageContext';

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="bg-gradient-to-r mt-5 from-white via-indigo-100 to-blue-100 text-black py-8 flex flex-col justify-between relative">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/img/afm-logo.png"
            width={150}
            height={200}
            alt="Logo"
            priority={true}
            className="rounded-r-xl border-2 border-blue-900"
          />
          <p className="mt-4 text-sm">
            {language == 'fr'
              ? 'Association Franco-Maghrébine de Mécanique et des Matériaux (AF3M)'
              : 'Franco-Maghreb Association of Mechanics and Materials (AF3M)'}
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-yellow-500 hover:underline"
          >
            {language == 'fr'
              ? 'CONDITIONS GÉNÉRALES DES DONATIONS'
              : 'GENERAL CONDITIONS OF DONATIONS'}
          </a>
        </div>

        {/* Right Side - Contact Section */}
        <div>
          <h2 className="text-4xl text-yellow-600 font-bold">
            {language == 'fr' ? 'Contacter Nous' : 'Contact Us'}
          </h2>
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

      {/* Footer Section */}
      <section className="bg-gray-200 text-black   py-3 px-2 w-max absolute bottom-0 right-0 rounded-xl">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © 2024 | Developed by
            <a
              href="https://www.linkedin.com/in/oussama-sassour/"
              target="_blank"
              className="text-blue-400 ml-1 hover:text-blue-500 font-semibold"
            >
              Oussama Sassour
            </a>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
