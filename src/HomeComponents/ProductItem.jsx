import "../css/productitem.css";
import Heart from "../FrequentlyUsed/Heart";

function ProductItem() {
  return (
    <div className="ArrivalItem-cont mb-12">
      <div className="ArrivalItem-img-container">
        <img src="../Images/BS-5 (1).JPG" alt="" className="ArrivalItem-img" />
      </div>

      <h3 className="text-left text-2xl">Austrian beer stein</h3>
      <div className="flex justify-between">
        <h4 className="text-xl">$160</h4>
        <div className="flex justify-end">   
          <img src="../Images/cart 1.png" alt="" className="ArrivalItem-cart mr-1" />
          <Heart />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
