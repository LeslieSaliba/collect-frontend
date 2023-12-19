import React, { useState} from "react";
import "../css/SingleProductSlider.css";

function SingleProductSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative SingleProductSlider-cont">
      <div className="flex items-center SingleProductSlider-mini">
 
        <img className="p-7 SingleProductSlider-prev" onClick={prevImage} src="Images/left.png" />

        <img
          src={images[currentImageIndex]}
          alt={`Product ${currentImageIndex + 1}`}
          className="SingleProductSlider-img"
        />

        <img className="p-7 SingleProductSlider-next" onClick={nextImage} src="Images/right.png" />
      </div>
      <button className="bg-white font-bold py-1 px-2 border border-black w-96 text-lg inline-block mt-5 flex justify-center SingleSlider-Wishlist">
          ADD TO WISHLIST{" "}
          <span>
            <img src="Images/heart.png" className="w-5 h-5 ml-1 mt-1" />
          </span>
        </button>
    

      <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-96 text-lg inline-block mt-5 flex justify-center SingleSlider-Cart">
        ADD TO CART{" "}
        <span>
          <img src="Images/cart.png" className="w-5 h-5 ml-1 mt-1" />
        </span>
      </button>
    </div>
  );
}

export default SingleProductSlider;
