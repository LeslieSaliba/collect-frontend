import axios from 'axios';
import React, { useState } from 'react';
import AddedSuccess from './AddedSuccess'; 
import AlreadyInWishlist from './AlreadyInWishlist'; 
import { useNavigate } from 'react-router-dom';

function SingleProductData({ openModal, productData }) {
  const wishlistId = localStorage.getItem('wishlistId');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const [showSuccessWishlistModal, setShowSuccessWishlistModal] = useState(false);
  const [showFailWishlistModal, setShowFailWishlistModal] = useState(false);
  const navigate = useNavigate();
  
  const addToWishlist = async () => {

    if (!userId || role !== 'client') {
      navigate('/SignIn');
      return;
    }

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/addProduct/${wishlistId}`, {
          productID: productData._id,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setShowSuccessWishlistModal(true);
      }
    catch (error) {
      console.error('Error updating wishlist:', error.message);
      setShowFailWishlistModal(true);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessWishlistModal(false);
  };

  const closeFailModal = () => {
    setShowFailWishlistModal(false);
  };

  return (
    <div className="">
      {productData ? (
        <>
          <div className="mb-5">
            <p className="text-4xl font-bold">{productData.name}</p>
          </div>

          <div className="italic text-3xl">{productData.price} $</div>
          <div className="mb-4 w-96 text-2xl">{productData.description}</div>
          <div className="mt-32">
            <button
             onClick={addToWishlist}
             className="bg-white font-bold py-1 px-2 border border-black w-96 text-lg inline-block mt-5 flex justify-center">

              ADD TO WISHLIST{" "}
              <span>
                <img src="Images/heart.png" className="w-5 h-5 ml-1 mt-1" alt="heart" />
              </span>
            </button>
          </div>

          <button 
          onClick={() => { 
            openModal();
          }}
          className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-96 text-lg inline-block mt-5 flex justify-center">
            ADD TO CART{" "}
            <span>
              <img src="Images/cart.png" className="w-5 h-5 ml-1 mt-1" alt="cart" />
            </span>
          </button>
          {showSuccessWishlistModal && (
              <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute bg-white p-8 rounded shadow-md">
                  <AddedSuccess closeModal={closeSuccessModal}/>
                </div>
              </div>
            )}

           {showFailWishlistModal && (
              <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute bg-white p-8 rounded shadow-md">
                  <AlreadyInWishlist closeModal={closeFailModal}/>
                </div>
              </div>
            )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleProductData;
