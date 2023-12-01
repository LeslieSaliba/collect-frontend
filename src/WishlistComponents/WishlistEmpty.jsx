function WishlistEmpty() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center mt-[-30%]">
      
        <p className="text-xl">Your wishlist is empty.</p>
        <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block mt-5">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}

export default WishlistEmpty;