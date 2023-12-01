import WishlistEmpty from "../WishlistComponents/WishlistEmpty";
import WishlistTable from "../WishlistComponents/WishlistTable";
import Footer from '../FrequentlyUsed/Footer';
import NavBar from '../FrequentlyUsed/NavBar';
import "../css/wishlist.css";

function Wishlist() {
  return (
    <>
    <NavBar/>
    <div className="max-w-screen-xl mx-auto p-4 wishlist-cont scale-95">
      <div className=" mb-5 italic">
        <p href="" className="text-3xl ">
          My Wishlist
        </p>
      </div>
      
       <WishlistTable />  
      {/* <WishlistEmpty /> */}
    </div>
    <Footer/>
    </>

  );
}

export default Wishlist;
