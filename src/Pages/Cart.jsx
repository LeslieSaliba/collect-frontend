import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CartDetails from "../CartComponents/CartDetails";
import CartEmpty from "../CartComponents/CartEmpty";
import CartTable from "../CartComponents/CartTable";
import Footer from '../FrequentlyUsed/Footer';
import NavBar from '../FrequentlyUsed/NavBar';
import "../css/cart.css";
import ConfirmCheckout from "../CartComponents/ConfirmCheckout";

function Cart() {
  const [shippingMethod, setShippingMethod] = useState("delivery");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const modalRef = useRef(null);
   const [cartData, setCartData] = useState(null);

   const removeFromCart = (productId) => {
    setCartData((prevData) => {
      const updatedData = {
        ...prevData,
        productIds: prevData.cart.productIds.filter((product) => product._id !== productId),
      };
      return updatedData;
    });
  };


   useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get(`http://localhost:8000/cart/getByUserID/${userId}`)
      .then(response => {
        setCartData(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching cart data:", error);
      });
  }, []); 

  
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

  const openModal = (shippingMethod) => {
    setIsModalOpen(true);
    setShippingMethod(shippingMethod);
  };
  console.log(shippingMethod);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateCartData = (newCartData) => {
    setCartData(newCartData);
  };

  if (!cartData || !cartData.cart.productIds || cartData.cart.productIds.length === 0) {
    return (
      <>
        <NavBar />
        <div className="max-w-screen-xl mx-auto p-4 Cart-cont">
          <div className="italic">
            <p href="" className="text-3xl">
              My Cart
            </p>
          </div>
          <CartEmpty />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="max-w-screen-xl mx-auto p-4 Cart-cont">
        <div className="italic">
          <p href="" className="text-3xl">
            My Cart
          </p>
        </div>
        <CartTable 
        cartData={cartData.cart}
        onRemoveFromCart={removeFromCart}
        updateCartData={updateCartData}
        />
        <CartDetails openModal={openModal} cartData={cartData}  />
        {isModalOpen && (
          <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div
              ref={modalRef}
              className="absolute bg-white p-8 rounded shadow-md"
            >
              <ConfirmCheckout
               closeModal={closeModal} 
               shippingMethod={shippingMethod}
               updateCartData={updateCartData}
               />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
