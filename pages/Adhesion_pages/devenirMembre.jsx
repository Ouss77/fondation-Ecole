import React, { useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import Head from 'next/head';
import { LanguageContext } from '@/components/Context/LanguageContext';

function DevenirMembre() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const { language } = useContext(LanguageContext);

  const translations = {
    fr: {
      title: 'Devenir Membre - AF3M',
      description: 'Rejoignez AF3M et devenez membre. Contactez-nous pour plus d\'informations ou pour envoyer un message.',
      heading: 'Contactez Nous',
      subheading: 'Tu veux nous rejoindre? Tu veux devenir membre de l\'association? Contactez-nous et laissez-nous un message par email.',
      emailLabel: 'Votre email:',
      subjectLabel: 'Sujet:',
      messageLabel: 'Votre message:',
      emailPlaceholder: 'nom@flowbite.com',
      subjectPlaceholder: 'Faites-nous savoir comment nous pouvons vous aider',
      messagePlaceholder: 'Laissez un commentaire...',
      buttonText: 'Envoyer le message',
      successMessage: 'Message envoyé avec succès!',
      errorMessage: 'Échec de l\'envoi du message.',
    },
    en: {
      title: 'Become a Member - AF3M',
      description: 'Join AF3M and become a member. Contact us for more information or to send a message.',
      heading: 'Contact Us',
      subheading: 'Want to join us? Want to become a member of the association? Contact us and leave us a message by email.',
      emailLabel: 'Your email:',
      subjectLabel: 'Subject:',
      messageLabel: 'Your message:',
      emailPlaceholder: 'name@flowbite.com',
      subjectPlaceholder: 'Let us know how we can help you',
      messagePlaceholder: 'Leave a comment...',
      buttonText: 'Send Message',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Failed to send message.',
    },
  };

  const t = translations[language] || translations.en;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_cthxgkq',
        'template_kxzy4yd',
        formData,
        'Zqr76foxjzXe1e-k2'
      );
      alert(t.successMessage);
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t.errorMessage);
    }
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:url" content="https://af3m-assoc.org/devenir-membre" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png"
        />
      </Head>
      <section className="pt-32 h-screen flex items-center">
        <div className="py-4 lg:py-4 px-8 mx-auto max-w-screen-md bg-white border-5 shadow-lg rounded-xl dark:bg-gray-800">
          <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            {t.heading}
          </h2>
          <p className="mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            {t.subheading}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <label htmlFor="email" className="w-1/4 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t.emailPlaceholder}
                required
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="subject" className="w-1/4 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t.subjectLabel}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t.subjectPlaceholder}
                required
              />
            </div>

            <div className="flex items-start">
              <label htmlFor="message" className="w-1/4 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleInputChange}
                className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t.messagePlaceholder}
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                aria-label='Send Message'
                type="submit"
                className="py-3 px-6 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t.buttonText}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default DevenirMembre;
