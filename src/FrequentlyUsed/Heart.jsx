import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/heart.css';

function Heart({ productId }) {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);


  useEffect(() => {
    const checkWishlist = async () => {
      const userId = localStorage.getItem('userId');
      const wishlistId = localStorage.getItem('wishlistId');

      if (userId && wishlistId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist/getByUserID/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          const productIds = response.data.data.productIds.map(product => product._id);
          setIsInWishlist(productIds.includes(productId));
        } catch (error) {
          console.error('Error checking wishlist:', error.message);
        }
      }
    };

    checkWishlist();
  }, [productId]);

  const handleHeartClick = async () => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const wishlistId = localStorage.getItem('wishlistId');

    if (!userId || role !== 'client') {
      navigate('/AuthForm');
      return;
    }

    try {
      if (isInWishlist) {
        await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/removeProduct/${wishlistId}`, {
          productID: productId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
  
        await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/addProduct/${wishlistId}`, {
          productID: productId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }

      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error updating wishlist:', error.message);
    }
  };


  return (
    <div>
        <div className="con-like" onClick={handleHeartClick}>
  <input class="like" type="checkbox" title="like" checked={isInWishlist}/>
  <div class="checkmark">
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
      <polygon class="poly" points="10,10 20,20"></polygon>
      <polygon class="poly" points="10,50 20,50"></polygon>
      <polygon class="poly" points="20,80 30,70"></polygon>
      <polygon class="poly" points="90,10 80,20"></polygon>
      <polygon class="poly" points="90,50 80,50"></polygon>
      <polygon class="poly" points="80,80 70,70"></polygon>
    </svg>
  </div>
</div>
    </div>
  );
}

export default Heart;
