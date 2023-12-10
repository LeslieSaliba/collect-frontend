import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistEmpty from "../WishlistComponents/WishlistEmpty";
import WishlistTable from "../WishlistComponents/WishlistTable";
import Footer from '../FrequentlyUsed/Footer';
import NavBar from '../FrequentlyUsed/NavBar';
import "../css/wishlist.css";

function Wishlist() {

  const [wishlistData, setWishlistData] = useState(null);
  const userId = localStorage.getItem("userId");

  const removeFromWishlist = (productId) => {
    setWishlistData((prevData) => {
      const updatedData = {
        ...prevData,
        productIds: prevData.productIds.filter((product) => product._id !== productId),
      };
      return updatedData;
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist/getByUserID/${userId}`);
        setWishlistData(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchData();
  }, [userId]);
  
  return (
    <>
    <NavBar/>
    <div className="max-w-screen-xl mx-auto p-4 wishlist-cont scale-95">
      <div className=" mb-5 italic">
        <p href="" className="text-3xl ">
          My Wishlist
        </p>
      </div>
      
      {wishlistData && wishlistData.productIds.length > 0 ? (
          <WishlistTable wishlistData={wishlistData} onRemoveFromWishlist={removeFromWishlist}/>
        ) : (
          <WishlistEmpty />
        )}
    </div>
    <Footer/>
    </>

  );
}

export default Wishlist;
