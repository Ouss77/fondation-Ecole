import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function DevenirMembre() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        'service_cthxgkq', // Replace with your EmailJS service ID
        'template_kxzy4yd', // Replace with your EmailJS template ID
        formData,
        'Zqr76foxjzXe1e-k2' // Replace with your EmailJS user ID
      );
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <section className=" pt-32 h-screen flex items-center">
      <div className="py-4 lg:py-4 px-8 mx-auto max-w-screen-md bg-white border-5 shadow-lg rounded-xl dark:bg-gray-800">
        <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contactez Nous
        </h2>
        <p className="mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Tu veux nous rejoindre? Tu veux devenir membre de l'association? Contactez-nous et laissez-nous un message par email.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label htmlFor="email" className="w-1/4 text-sm font-medium text-gray-900 dark:text-gray-300">Your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="subject" className="w-1/4 text-sm font-medium text-gray-900 dark:text-gray-300">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Let us know how we can help you"
              required
            />
          </div>

          <div className="flex items-start">
            <label htmlFor="message" className="w-1/4 text-sm font-medium text-gray-900 dark:text-gray-300">Your message:</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleInputChange}
              className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-6 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DevenirMembre;
