import SingleProductData from "../SingleProductComponents/SingleProductData";
import SingleProductSlider from "../SingleProductComponents/SingleProductSlider";
import "../css/SingleProduct.css";

function SingleProduct() {
  return (
    <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 SingleProduct-cont gap-24 bg-white">
      <div>
        <div className="mr-11 italic mb-16 text-center">
          <p className="text-3xl">All products / Beer Steins</p>
        </div>

        <SingleProductSlider />
      </div>
      <div className="mt-24">
        <SingleProductData />
      </div>
    </div>
  );
}

export default SingleProduct;
