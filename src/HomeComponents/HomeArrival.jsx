import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/HomeArrival.css"
import ProductItem from './ProductItem';

function HomeArrival() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
        if (response.data.success) {
          const lastFourProducts = response.data.data.slice(-4);
          setProducts(lastFourProducts);
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='max-w-screen-xl mx-auto p-4 HomeArrival-cont'>
        <p class="text-3xl text-center  underline HomeArrival-title">LATEST ARRIVALS</p>
        <div className="homeCategeries-link-container mb-5 italic">
        <a href=""className="text-3xl homeCategeries-link">See all arrivals <span className="ml-2 text-3xl">&#8594;</span></a>
        </div>
            <div className="flex flex-wrap items-center justify-between HomeArrival-items-cont "> 
            {products.map((product) => (
          <ProductItem
            key={product._id}
            ProductID={product._id}
            ProductName={product.name}
            ProductPrice={product.price}
            ProductImage={product.images[0]} 
            ProductStatus={product.status}
            DiscountPercentage={product.discountPercentage}
          />
        ))}
        </div>
        
    </div>
  );
}

export default HomeArrival;
