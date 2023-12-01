import React, { useState, useRef, useEffect } from "react";
import "../css/CartDetails.css";
import ConfirmCheckout from "./ConfirmCheckout";
function CartDetails ({openModal}) {
/*   const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
 */
 /*  useEffect(() => {
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
 */
  return (
    <div className="cartDetails-cont p-8 scale-90 mt-4">
      <p className="text-3xl italic mb-9 ml-8">Choose shipping method</p>
      <form>
        <div className="flex justify-between">
          <div className="ml-12">
            <div className="mb-4">
              <label className="text-2xl">
                <input type="radio" className="mr-4" name="shippingMethod" />
                delivery at home (under 5-7 days) - 3 ${" "}
                <p className="text-lg ml-8 italic">
                  Maktabi building, Clemenceau, Hamra
                </p>
              </label>
            </div>
            <div className="mb-4">
              <label className="text-2xl">
                <input type="radio" className="mr-4" name="shippingMethod" />
                store pickup (on Saturdays only) - free{" "}
                <p className="text-lg ml-8  italic">Betchay, Baabda</p>
              </label>
            </div>
          </div>

          <div className="flex gap-60">
            <div>
              <p className="text-xl mb-4 italic">Subtotal</p>
              <p className="text-xl mb-4 italic">Shipping</p>
              <p className="text-xl mb-4 italic">Total</p>
            </div>
            <div>
              <p className="text-xl mb-4 italic">$100</p>
              <p className="text-xl mb-4 italic">$10</p>
              <p className="text-xl mb-4 italic">$110</p>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-white text-red-700 font-bold py-3 px-2 border border-red-700 w-96 text-lg inline-block mt-5 flex justify-center"
        >
          <p>
            CHECKOUT <span className="ml-12">163$ </span>{" "}
          </p>
        </button>
      </div>
      
    </div>
  );
}

export default CartDetails;
