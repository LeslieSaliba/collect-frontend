import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ErrorAddingToCart from './ErrorAddingToCart'
import ConfirmAddToCart from "../WishlistComponents/AddToCartConfirmation";

function WishlistTable({ wishlistData,  onRemoveFromWishlist  }) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('role');
  const cartId = localStorage.getItem('cartId');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showFailCartModal, setShowFailCartModal] = useState(false);
  const [ModalMessage, setModalMessage] = useState('');


  const openConfirmationModal = (productId) => {
    setSelectedProduct(productId);
    setShowConfirmationModal(true);
  };

  const navigate = useNavigate();

  const removeFromWishlist = async (wishlistId, productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/wishlist/removeProduct/${wishlistId}`,
        {
          productID: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); 
      if (onRemoveFromWishlist) {
        onRemoveFromWishlist(productId);
      }

  
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      
    }
  };

  const [addToCartStatus, setAddToCartStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const addToCart = async (cartId, productId) => {
    setAddToCartStatus({ loading: true, success: null, error: null });

    try {
      if (!userId || userRole !== 'client') {
        navigate('/AuthForm');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/addProduct/${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productID: productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowFailCartModal(true);
        setAddToCartStatus({ loading: false, success: data.message, error: null });
        removeFromWishlist(localStorage.getItem('wishlistId'), productId);
      } else {
        setModalMessage(data.message)
        setAddToCartStatus({ loading: false, success: null, error: data.message });
        console.error("API Error:", data.message);
        setShowFailCartModal(false);
      }

    } catch (error) {
      setShowFailCartModal(true);
      setAddToCartStatus({ loading: false, success: null, error: 'Unable to add product to cart' });
      console.error("API Error:", error.message);
    }
  };

  const addToCartWithConfirmation = async (productId) => {
    await addToCart(cartId, productId);
    setShowConfirmationModal(false);
  };


  return (
    <div className="mt-8">
    <div className="homeCategeries-link-container italic">
      <a href="" className="text-3xl homeCategeries-link">
        Continue Shopping <span className="ml-2 text-3xl">&#8594;</span>
      </a>
    </div>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="border-b border-black p-4 text-center font-thin text-2xl">Product</th>
          <th className="border-b border-black p-4 text-center"></th>
          <th className="border-b border-black p-4 text-center font-thin text-2xl">Price</th>
          <th className="border-b border-black p-4 text-center"></th>
          <th className="p-4 text-center"></th>
        </tr>
      </thead>
      <tbody>
        {wishlistData &&
          wishlistData.productIds.map((product) => (
            <tr key={product._id}>
              <td className="p-4 text-center">
                <img src={product.images[0]} alt="Product" className="w-32 h-52 object-cover mx-auto" />
                <h1 className="uppercase font-bold text-xl text-red-700">{product.status}</h1>
              </td>
              <td className="p-4 text-start text-2xl">{product.name}</td>
              <td className="p-4 text-center text-2xl">
              {product.discountPercentage !== 0 ? (
                    <>
                      <p className="text-green-500">${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</p>
                      <p className="line-through ">${product.price}</p>
                    </>
                  ) : (
                    <p>{product.price}$</p>
                  )}
              </td>
              <td className="p-4 ">
                <button 
                onClick={() => openConfirmationModal(product._id)}
                className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-64 text-lg  flex justify-center ml-auto">
                  ADD TO CART{' '}
                  <span>
                    <img src="Images/cart.png" className="w-5 h-5 ml-1 mt-1" />
                  </span>
                </button>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => removeFromWishlist(localStorage.getItem('wishlistId'), product._id)}
              
                >
                  x
                </button>
              </td>
          {showConfirmationModal && selectedProduct && (
          <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white p-8 rounded shadow-md">
              <ConfirmAddToCart
               onConfirm={() => addToCartWithConfirmation(selectedProduct)}
               closeModal={() => setShowConfirmationModal(false)} 
               />
            </div>
          </div>
        )}
            </tr>
          ))}
      </tbody>
    </table>
    {showFailCartModal && (
          <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white p-8 rounded shadow-md">
              <ErrorAddingToCart 
              closeModal={() => setShowFailCartModal(false)}
               Message={ModalMessage}/>
            </div>
          </div>
        )}
  </div>
  );
}

export default WishlistTable;