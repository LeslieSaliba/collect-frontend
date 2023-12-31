import React, { useState, useEffect } from "react";
import "../css/CartDetails.css";

function CartDetails({ openModal, openAddressModal, cartData }) {
  const [shippingCost, setShippingCost] = useState(3);
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [total, setTotal] = useState(cartData.cart.totalPrice + shippingCost);
  const userAddress = cartData.user.fullAddress;
  const userCity = cartData.user.city;

  const handleShippingMethodChange = (event) => {
    const method = event.target.value;
    setShippingMethod(method);
    setTotal(method === "delivery" ? cartData.cart.totalPrice + shippingCost : cartData.cart.totalPrice);
  };

  return (
    <div className="cartDetails-cont p-8 scale-90 mt-4">
      <p className="text-3xl italic mb-9 ml-8 CartDetails-Title">Choose shipping method</p>
      <form>
        <div className="flex justify-between CartDetails-form">
          <div className="ml-12 CartDetails-input">
            <div className="mb-4">
              <label className="text-2xl">
                <input
                  type="radio"
                  className="mr-4"
                  name="shippingMethod"
                  value="delivery"
                  checked={shippingMethod === "delivery"}
                  onChange={handleShippingMethodChange}
                />
                delivery at home (under 5-7 days) - 3 ${" "}
                <p className="text-lg ml-8 italic">
                  {userCity}, {userAddress.street},  {userAddress.building}, Floor: {userAddress.floor}
                  <a onClick={openAddressModal} className="underline ml-4 not-italic">edit address</a>
                </p>
              </label>
            </div>
            <div className="mb-4">
              <label className="text-2xl">
                <input
                  type="radio"
                  className="mr-4"
                  name="shippingMethod"
                  value="pick up"
                  checked={shippingMethod === "pick up"}
                  onChange={handleShippingMethodChange}
                />
                store pickup (on Saturdays only) - free{" "}
                <p className="text-lg ml-8  italic">Betchay, Baabda</p>
              </label>
            </div>
          </div>

          <div className="flex gap-60 CartDetails-receipt">
            <div>
              <p className="text-xl mb-4 italic">Subtotal</p>
              <p className="text-xl mb-4 italic">Shipping</p>
              <p className="text-xl mb-4 italic">Total</p>
            </div>
            <div>
              <p className="text-xl mb-4 italic">{cartData.cart.totalPrice} $</p>
              <p className="text-xl mb-4 italic">{shippingMethod === "delivery" ? `${shippingCost.toFixed(2)} $` : "-"}</p>
              <p className="text-xl mb-4 italic">{(cartData.cart.totalPrice + (shippingMethod === "delivery" ? shippingCost : 0)).toFixed(2)} $</p>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-end">
        <button
          onClick={() => openModal(shippingMethod)}
          className="bg-white text-red-700 font-bold py-3 px-2 border border-red-700 w-96 text-lg inline-block mt-5 flex justify-center hover:bg-red-100 checkout-button"
        >
          <p className="cartDetails-checkout">
            CHECKOUT<span className="ml-12">{(cartData.cart.totalPrice + (shippingMethod === "delivery" ? shippingCost : 0)).toFixed(2)} $ </span>{" "}
          </p>
          <br /><p> </p>
          <p className="font-normal italic whitespace-pre"> (cash on delivery)</p>
        </button>
      </div>

    </div>
  );
}

export default CartDetails;
