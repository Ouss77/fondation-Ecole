"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "./Context/LanguageContext";

const Partenaires = ({  }) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="sm:w-10/12 w-11/12 mt-10 mx-auto pb-20 rounded-xl bg-slate-100">
      <h2 className="text-2xl font-semibold text-yellow-600 mx-5 xl:mx-20  mb-8 pt-10"> {language == "fr" ? "Nos Partenaires": "Our Partners"}</h2>
      <div className="flex justify-center gap-6 mx-5">
          <div  className="w-1/3 flex justify-center">
            <Image
              src='/img/partenaire1.png'
              width={200} // Customize the width as needed
              height={100} // Customize the height as needed
              className="object-contain" // Ensures the image is contained within the box without being distorted
            />
          </div>
          <div  className="w-1/3 flex justify-center">
            <Image
              src='/img/partenaire2.png'
              width={200} // Customize the width as needed
              height={100} // Customize the height as needed
              className="object-contain" // Ensures the image is contained within the box without being distorted
            />
          </div>
          <div  className="w-1/3 flex justify-center">
            <Image
              src='/img/partenaire3.png'
              width={200} // Customize the width as needed
              height={100} // Customize the height as needed
              className="object-contain" // Ensures the image is contained within the box without being distorted
            />
          </div>
          
        
      </div>
    </div>
  )
}
export default Partenaires;
