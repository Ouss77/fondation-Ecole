"use client"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AddActualite() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter(); // For routing after successful login

  useEffect(() => {
    // Check if the 'auth' cookie exists (user is logged in)
    const isAuthenticated = document.cookie.includes("authTrue");

    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    // Log to verify if the image is being correctly attached
    console.log("Image:", image);
    if (image) formData.append("image", image);
  
    const response = await fetch("/api/addActualite", {
      method: "POST",
      body: formData,
    });
  
    if (response.ok) {
      setMessage("Actualité added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } else {
      const error = await response.json();
      setMessage(error.message || "An error occurred.");
    }
  };
  

  return (
    <div className="lg:max-w-3xl mx-auto pt-32 w-5/6 ">
      <form onSubmit={handleSubmit} className="bg-gray-100 mt-10 p-10  rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle Actualité</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
          
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image (optional)</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded mt-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
          Add Actualité
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
