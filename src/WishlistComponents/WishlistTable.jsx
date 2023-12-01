import React from "react";
import Heart from "../FrequentlyUsed/Heart";

function WishlistTable() {
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
          <tr>
            <td className="p-4 text-center">
              <img
                src="Images/BS-5 (1).JPG"
                alt="Product"
                className="w-32 h-52 object-cover mx-auto"
              />
            </td>
            <td className="p-4 text-start text-2xl">
              Japanese Vase
            </td>
            <td className="p-4 text-center text-2xl">
              <p>106$</p>
            </td>
            <td className="p-4 ">
            <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-64 text-lg  flex justify-center ml-auto">
        ADD TO CART{" "}
        <span>
          <img src="Images/cart.png" className="w-5 h-5 ml-1 mt-1" />
        </span>
      </button>
            </td>
            <td className="p-4 text-center">
             <Heart />
            </td>
          </tr>
          <tr>
            <td className="p-4 text-center">
              <img
                src="Images/BS-5 (1).JPG"
                alt="Product"
                className="w-32 h-52 object-cover mx-auto"
              />
            </td>
            <td className="p-4 text-start text-2xl">
              Japanese Vase
            </td>
            <td className="p-4 text-center text-2xl">
              <p>106$</p>
            </td>
            <td className="p-4 ">
            <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-64 text-lg  flex justify-center ml-auto">
        ADD TO CART{" "}
        <span>
          <img src="Images/cart.png" className="w-5 h-5 ml-1 mt-1" />
        </span>
      </button>
            </td>
            <td className="p-4 text-center">
              <Heart />
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default WishlistTable;
