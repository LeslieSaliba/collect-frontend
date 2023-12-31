import React, { useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";

function CartTable({ cartData, OnDelete}) {
  const token = localStorage.getItem('token');
  const cartId = localStorage.getItem('cartId');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openConfirmationModal = (productId) => {
    setSelectedProduct(productId);
    setShowConfirmationModal(true);
  };

  const removeFromCart = async (cartId, productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/removeProduct/${cartId}`,
        {
          productID: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowConfirmationModal(false);
      OnDelete();


  
    } catch (error) {
      console.error('Error removing product from Cart:', error);
      
    }
  };

  const removeFromCartWithConfirmation = async (productId) => {
    await removeFromCart(cartId, productId);
    setShowConfirmationModal(false);
  };

  
  return (
    
    <div className="mt-8 wishlistTable-table">
      <div className="homeCategeries-link-container italic">
        <Link to='/Shop'>
          <a href="" className="text-3xl homeCategeries-link">
            Continue Shopping <span className="ml-2 text-3xl">&#8594;</span>
          </a>
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border-b border-black p-4 text-center font-thin text-2xl">Product</th>
            <th className="border-b border-black p-4 text-center"></th>
            <th className="border-b border-black p-4 text-center font-thin text-2xl">Price</th>
            <th className="border-b border-black p-4 text-center font-thin text-2xl">Discount</th>
            <th className="p-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {cartData.productIds.map((product) => (
            <tr key={product._id}>
              <td className="p-4 text-center">
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-32 h-45 object-cover mx-auto"
                  style={{ width: '100px', height: '130px' }}
                />
              </td>
              <td className="p-4 text-start text-2xl">
                {product.name}
              </td>
              <td className="p-4 text-center text-2xl">
               
                <p style={{ color: product.discountPercentage !== 0 ? '#00cc00' : 'inherit' }}>
                  ${product.discountPercentage !== 0
                    ? (product.price * (100 - product.discountPercentage)) / 100
                    : product.price}
                </p>
                {product.discountPercentage !== 0 && (
                  <p style={{ textDecoration: 'line-through', color: '#666' }}>
                    {product.price}
                  </p>
                )}

              </td>
              <td className="p-4 text-center text-2xl">
                {product.discountPercentage !== 0 ? `${product.discountPercentage}%` : "-"}
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => {
                    openConfirmationModal(product._id)
                  }}
                >x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmationModal && selectedProduct && (
        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-8 rounded shadow-md">
            <ConfirmDelete
              onConfirm={() => removeFromCartWithConfirmation(selectedProduct)}
              closeModal={() => setShowConfirmationModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartTable;
