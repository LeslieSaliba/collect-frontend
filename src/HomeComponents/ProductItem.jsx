import React, { useState, useRef, useEffect } from "react";
import "../css/ArrivalItem.css";
import Heart from "../FrequentlyUsed/Heart";
import SingleProduct from "../Pages/SingleProduct";

function ProductItem({ProductName, ProductPrice, ProductImage, ProductID,ProductStatus,DiscountPercentage}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  // console.log(ProductStatus, ProductName)
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
    if (ProductStatus !== "sold") {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ArrivalItem-cont mb-12 relative">
      <div className="ArrivalItem-img-container relative">
        {ProductStatus === "sold" && (
          <div className="absolute top-0 right-0 bg-white text-red-700 my-4 font-sans py-1 px-4 z-10 shadow-xl font-bold">
            {ProductStatus}
          </div>
        )}
        {ProductStatus !== "sold" && DiscountPercentage !== 0 && (
          <div className="absolute top-0 right-0 bg-white text-green-700 my-4 font-sans py-1 px-4 z-10 shadow-xl font-bold">
            {DiscountPercentage}% off
          </div>
        )}
        <img
          src={ProductImage}
          alt=""
          className="ArrivalItem-img"
          onClick={openModal}
        />
      </div>

      <h3 className="text-left text-2xl capitalize">{ProductName}</h3>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          {DiscountPercentage !== 0 ? (
            <div className="flex items-center">
              <span className="text-xl line-through mr-2">{ProductPrice} $</span>
              <span className="text-green-700 text-xl font-bold">
                {calculateDiscountedPrice(ProductPrice, DiscountPercentage)} $
              </span>
            </div>
          ) : (
            <h4 className="text-xl">{ProductPrice} $</h4>
          )}
        </div>
        <div className="flex justify-end">
          <Heart productId={ProductID} />
          <img
            src="Images/cart 1.png"
            alt=""
            className="ArrivalItem-cart mr-1 cursor-pointer"
            onClick={openModal}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="absolute bg-white p-8 rounded shadow-md">
            <SingleProduct ProductID={ProductID} />
          </div>
        </div>
      )}
    </div>
  );
}

const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;
  return discountedPrice.toFixed(2); 
};

export default ProductItem;