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
    <div className="relative">
      <div className="flex items-center">
 
        <img className="p-7" onClick={prevImage} src="Images/left.png" />

        <img
          src={images[currentImageIndex]}
          alt={`Product ${currentImageIndex + 1}`}
          className="SingleProductSlider-img"
        />

        <img className="p-7" onClick={nextImage} src="Images/right.png" />
      </div>
    </div>
  );
}

export default SingleProductSlider;
