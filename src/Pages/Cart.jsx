
import CartDetails from "../CartComponents/CartDetails";
import CartEmpty from "../CartComponents/CartEmpty";
import CartTable from "../CartComponents/CartTable";
import Footer from '../FrequentlyUsed/Footer';
import NavBar from '../FrequentlyUsed/NavBar';
import "../css/cart.css";
import React, { useState, useRef, useEffect } from "react";
import ConfirmCheckout from "../CartComponents/ConfirmCheckout";
function Cart() {
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
    <>
    <NavBar/>
    <div className="max-w-screen-xl mx-auto p-4 Cart-cont">
      <div className=" italic">
        <p href="" className="text-3xl ">
          My Cart
        </p>
      </div>
      
       <CartTable />  
       <CartDetails openModal={openModal} />
      {/* <CartEmpty /> */}
      {isModalOpen && (
        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            ref={modalRef}
            className="absolute bg-white p-8 rounded shadow-md"
          >
            <ConfirmCheckout closeModal={closeModal} />
            
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Cart;
