import React, { useState,useRef, useEffect } from "react";


function CartAddress ({closeModal}) {
   

  return (
    <div className="  flex items-center justify-center">
        
      <div className="text-center ">
      <p className="text-right mb-8" onClick={closeModal}>X</p>
      <p className="text-3xl text-center  underline HomeArrival-title">
        EDIT ADDRESS
      </p>
        <form className="py-4">
          <div className="flex flex-wrap mb-4">
            <input
              type="number"
              name="floor"
          
              placeholder="Floor"
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
            <span className="contactUsDescription-span"></span>
            <input
              type="text"
              name="building"
          
              placeholder="Building"
              className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
          </div>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              name="city"
          
              placeholder="City"
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
            <span className="contactUsDescription-span"></span>
            <input
              type="text"
              name="street"
          
              placeholder="Street"
              className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
          </div>
          <textarea
            className="w-full px-4 py-2 h-28 bg-gray-100 focus:outline-none  text-lg text-black"
            placeholder="Additional Description"
      
            name="message"
            required
          ></textarea>
          <button
            className="bg-white text-red-700 font-bold py-2 px-6 border border-red-700 text-lg inline-block mt-5 flex ml-auto justify-center"
         
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartAddress;
