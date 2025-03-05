"use client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddActualite() {
  const [titleFr, setTitleFr] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_fr", titleFr);
    formData.append("description_fr", descriptionFr);
    formData.append("title_en", titleEn);
    formData.append("description_en", descriptionEn);

    if (image) formData.append("image", image);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ajouterActualite.php`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Actualité added successfully!");
        router.push("/admin_pages/modifierActualite");
        setTitleFr("");
        setDescriptionFr("");
        setTitleEn("");
        setDescriptionEn("");
        setImage(null);
      } else {
        const error = await response.json();
        setMessage(error.message || "An error occurred.");
      }
    } catch (err) {
      setMessage("An error occurred while submitting the form.");
    }

  };

  return (
    <div className="lg:max-w-3xl mx-auto w-full lg:ml-56 bg-white rounded-2xl shadow-lg shadow-indigo-400/50">
      <form onSubmit={handleSubmit} className="mt-10 p-10 rounded">
        <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle Actualité</h2>

        {/* French Inputs */}
        <div className="mb-4">
          <label htmlFor="titleFr" className="block text-gray-700">
            Titre (Français)
          </label>
          <input
            type="text"
            id="titleFr"
            value={titleFr}
            onChange={(e) => setTitleFr(e.target.value)}
            required
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descriptionFr" className="block text-gray-700">
            Description (Français)
          </label>
          <textarea
            id="descriptionFr"
            value={descriptionFr}
            onChange={(e) => setDescriptionFr(e.target.value)}
            required
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        {/* English Inputs */}
        <div className="mb-4">
          <label htmlFor="titleEn" className="block text-gray-700">
            Title (English)
          </label>
          <input
            type="text"
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descriptionEn" className="block text-gray-700">
            Description (English)
          </label>
          <textarea
            id="descriptionEn"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            required
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image (optional)
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <button
        aria-label="Submit"
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Actualité
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
