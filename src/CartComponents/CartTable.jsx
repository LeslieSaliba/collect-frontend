import React from "react";
import axios from "axios";

function CartTable({ cartData, onRemoveFromCart}) {
  const token = localStorage.getItem('token');

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
      
      console.log(response.data); 
      if (onRemoveFromCart) {
        onRemoveFromCart(productId);
      }


  
    } catch (error) {
      console.error('Error removing product from Cart:', error);
      
    }
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
            <th className="border-b border-black p-4 text-center font-thin text-2xl">Original Price</th>
            <th className="border-b border-black p-4 text-center font-thin text-2xl">Discount</th>
            <th className="border-b border-black p-4 text-center font-thin text-2xl">Price</th>
            <th className="p-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
        {cartData.productIds.map(product => (
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
              <p> {product.price}</p>
            </td>
            <td className="p-4 text-center text-2xl">
              {product.discountPercentage !== 0 ? `${product.discountPercentage}%` : "-"}
            </td>
            <td className="p-4 text-center text-2xl">
            {product.discountPercentage !== 0
              ? (product.price * (100 - product.discountPercentage)) / 100
              : product.price}
            </td>
            <td className="p-4 text-center">
              <button
               onClick={() => {
                removeFromCart(localStorage.getItem('cartId'), product._id);
                if (onRemoveFromCart) {
                  onRemoveFromCart(product._id);
                }
              }}
              >x</button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default CartTable;
