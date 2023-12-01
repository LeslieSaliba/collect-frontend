import React, { useState, useRef, useEffect } from "react";
import "../css/ArrivalItem.css";
import Heart from "../FrequentlyUsed/Heart";
import SingleProduct from "../Pages/SingleProduct";

function ProductItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ArrivalItem-cont mb-12">
      <div className="ArrivalItem-img-container">
        <img src="Images/BS-5 (1).JPG" alt="" className="ArrivalItem-img" 
         onClick={openModal}/>
      </div>

      <h3 className="text-left text-2xl">Austrian beer stein</h3>
      <div className="flex justify-between">
        <h4 className="text-xl">$160</h4>
        <div className="flex justify-end">
          <img
            src="Images/cart 1.png"
            alt=""
            className="ArrivalItem-cart mr-1 cursor-pointer"
            onClick={openModal}
          />
          <Heart />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="absolute bg-white p-8 rounded shadow-md">
            <SingleProduct />
            {/* <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItem;