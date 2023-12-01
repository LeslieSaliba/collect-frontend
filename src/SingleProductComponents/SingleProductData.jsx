function SingleProductData() {
  return (
    <div className="">
      
        <div className=" mb-5">
          <p className="text-4xl font-bold">Austrian Beer Stein</p>
        </div>
      
      <div className="italic text-3xl">30 $</div>
      <div className="mb-4 w-96 text-2xl">
        Description about the product description about the product description
        about the product description about the product...
        <br /> <br /> 
       <div> Dimensions: 30 cm x 15 cm</div>
        
         <div>Material: ceramic{" "}</div>
      </div>
      <div className="mt-32">
        <button className="bg-white font-bold py-1 px-2 border border-black w-96 text-lg inline-block mt-5 flex justify-center">
          ADD TO WISHLIST{" "}
          <span>
            <img src="Images/heart.png" className="w-5 h-5 ml-1 mt-1" />
          </span>
        </button>
      </div>

      <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-96 text-lg inline-block mt-5 flex justify-center">
        ADD TO CART{" "}
        <span>
          <img src="Images/cart.png" className="w-5 h-5 ml-1 mt-1" />
        </span>
      </button>
   </div>
  );
}

export default SingleProductData;
