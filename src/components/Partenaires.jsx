"use client";
import React from "react";
import Image from "next/image";

const Partenaires = ({  }) => {
  return (
    <div className="w-11/12 mx-auto mt-10 pb-20 rounded-xl bg-slate-100">
      <h2 className="text-4xl font-semibold text-yellow-600 ml-32 mb-8 pt-10">Nos Partenaires</h2>
      <div className="flex justify-center gap-6 ">
          <div  className="w-1/3 flex justify-center">
            <Image
              src='/partenaire1.png'
              width={200} // Customize the width as needed
              height={100} // Customize the height as needed
              className="object-contain" // Ensures the image is contained within the box without being distorted
            />
          </div>
          <div  className="w-1/3 flex justify-center">
            <Image
              src='/partenaire2.png'
              width={200} // Customize the width as needed
              height={100} // Customize the height as needed
              className="object-contain" // Ensures the image is contained within the box without being distorted
            />
          </div>
          <div  className="w-1/3 flex justify-center">
            <Image
              src='/partenaire3.png'
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
