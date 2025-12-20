import React, { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from './Context/LanguageContext';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const { language } = useContext(LanguageContext);

  const socialLinks = [
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white mt-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ml-20 lg:gap-12">
          
          {/* Logo & Description Section */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-fit border border-white/20">
              <Image
                src="/img/afm-logo.png"
                width={140}
                height={140}
                alt="AF3M Logo"
                priority={true}
                className="rounded-xl"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {language === 'fr'
                ? 'Association Franco-Maghrébine de Mécanique et des Matériaux (AF3M)'
                : 'Franco-Maghreb Association of Mechanics and Materials (AF3M)'}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium group"
            >
              <span className="border-b border-yellow-400 group-hover:border-yellow-300">
                {language === 'fr'
                  ? 'Conditions générales'
                  : 'General conditions'}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-6">
              {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
            </h2>
            <div className="space-y-3">
              <a 
                href="mailto:contact@association.foundation" 
                className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                  <FaEnvelope className="text-yellow-400" />
                </div>
                <span className="text-sm">contact@association.foundation</span>
              </a>
              
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-yellow-400" />
                </div>
                <span className="text-sm">Casablanca - Maroc - Ecole des Mines de Rabat</span>
              </div>
              
              <a 
                href="tel:+212666444222" 
                className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                  <FaPhone className="text-yellow-400" />
                </div>
                <span className="text-sm">+212 666 444 222</span>
              </a>
            </div>
          </div>

          {/* Social Media Section */}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © 2024 AF3M. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.
          </p>
          <p className="flex items-center gap-2">
            {language === 'fr' ? 'Développé par' : 'Developed by'}
            <a
              href="https://www.linkedin.com/in/oussama-sassour/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors font-semibold group"
            >
              Oussama Sassour
              <FaLinkedin className="group-hover:scale-110 transition-transform" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;