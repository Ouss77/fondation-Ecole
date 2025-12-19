import React, { useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import Head from 'next/head';
import { LanguageContext } from '@/components/Context/LanguageContext';
import {
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

function DevenirMembre() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { language } = useContext(LanguageContext);

  const translations = {
    fr: {
      title: 'Devenir Membre - AF3M',
      description: 'Rejoignez AF3M et devenez membre.',
      heading: 'Rejoignez-Nous',
      subheading:
        'Vous souhaitez devenir membre de l’AF3M ? Contactez-nous et laissez-nous un message.',
      emailLabel: 'Votre email',
      subjectLabel: 'Sujet',
      messageLabel: 'Votre message',
      emailPlaceholder: 'nom@exemple.com',
      subjectPlaceholder: 'Comment pouvons-nous vous aider ?',
      messagePlaceholder: 'Parlez-nous de votre intérêt pour l’AF3M...',
      buttonText: 'Envoyer le message',
      buttonSending: 'Envoi en cours...',
      successMessage: 'Message envoyé avec succès !',
      errorMessage: 'Échec de l’envoi. Veuillez réessayer.',
      benefits: {
        title: 'Pourquoi devenir membre ?',
        items: [
          'Accès aux conférences internationales',
          'Networking avec des experts',
          'Publications scientifiques',
          'Opportunités de collaboration'
        ]
      }
    },
    en: {
      title: 'Become a Member - AF3M',
      description: 'Join AF3M and become a member.',
      heading: 'Join Us',
      subheading:
        'Want to become a member of AF3M? Contact us and leave us a message.',
      emailLabel: 'Your email',
      subjectLabel: 'Subject',
      messageLabel: 'Your message',
      emailPlaceholder: 'name@example.com',
      subjectPlaceholder: 'How can we help you?',
      messagePlaceholder: 'Tell us about your interest in AF3M...',
      buttonText: 'Send message',
      buttonSending: 'Sending...',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Failed to send. Please try again.',
      benefits: {
        title: 'Why become a member?',
        items: [
          'Access to international conferences',
          'Networking with experts',
          'Scientific publications',
          'Collaboration opportunities'
        ]
      }
    },
  };

  const t = translations[language] || translations.en;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_cthxgkq',
        'template_kxzy4yd',
        formData,
        'Zqr76foxjzXe1e-k2'
      );
      setSubmitStatus('success');
      setFormData({ email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Head>

      <section className="pt-24 pb-16 px-2 sm:px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500">
              {t.heading}
            </h1>
            <div className="w-20 h-1 bg-yellow-500 rounded-full mx-auto my-4" />
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Benefits */}
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl shadow-sm p-6 border border-blue-100 h-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {t.benefits.title}
                </h2>
                <ul className="space-y-3">
                  {t.benefits.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <FaCheckCircle className="text-yellow-500 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex gap-2 text-sm">
                    <FaCheckCircle className="text-green-600 mt-0.5" />
                    {t.successMessage}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 text-sm">
                    <FaExclamationCircle className="text-red-600 mt-0.5" />
                    {t.errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t.subjectLabel}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
                      placeholder={t.subjectPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg text-sm resize-none"
                      placeholder={t.messagePlaceholder}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-lg transition"
                  >
                    {isSubmitting ? t.buttonSending : t.buttonText}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default DevenirMembre;
