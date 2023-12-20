import {Link} from 'react-router-dom';

function CartEmpty() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center mt-[-30%]">
        
          
          <img src='Images/empty-cart.png' ></img>
          <p className="text-xl">Your cart is empty.</p>
         <Link to='/Shop '> <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block mt-5 hover:bg-red-100">
            SHOP NOW
          </button></Link>
        </div>
      </div>
    );
  }
  
  export default CartEmpty;