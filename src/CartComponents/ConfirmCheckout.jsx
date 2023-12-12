import React from "react";
import axios from "axios";

function ConfirmCheckout ({closeModal,shippingMethod, updateCartData}) {
  const token = localStorage.getItem('token');
  const cartId = localStorage.getItem('cartId');
 
  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/create/${cartId}`, {
        shippingMethod: shippingMethod,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      closeModal();
      updateCartData(response.data.updatedCart);

    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  return (
    <div className="  flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl m-12 w-2/3 mx-auto">
          Are you sure you want to complete this action?
        </p>
        <div className="flex justify-end bg-gray-100 p-6 items-center">
          <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block  mr-4" onClick={closeModal}>
            CANCEL
          </button>
          <button 
          onClick={handleConfirm}
          className="bg-red-700 text-white  font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block ">
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCheckout;
