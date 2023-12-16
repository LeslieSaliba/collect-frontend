import { useState, useEffect } from "react";
import axios from "axios";

function EditOrder({
  closeEditOrderModal,
  orderID,
  editOrder,
  products,
  orderTime,
  userId,
  status,
  shippingMethod,
  totalPrice,
}) {
  console.log("products", products);
  console.log("shippingMethod", shippingMethod);
  console.log("totalPrice", totalPrice);
  const [userName, setUsersName] = useState("");
  const [category, setCategory] = useState("");
  const [orderStatus, setOrderStatus] = useState(status);
  const [errorMessage, setErrorMessage] = useState("");
  const [product, setProduct] = useState([]);
  
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await setOrderStatus((prevOrderStatus) => {
        editOrder(orderID, prevOrderStatus); 
        return prevOrderStatus; 
      });

      closeEditOrderModal();
    } catch (error) {
      console.error("Error updating order status: ", error);
   
    }
  };

   const fetchUserName = async (userId) => {
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_API_URL}/user/getById/${userId}`
       );

       const { fullName } = response.data.data;
       const formattedName = `${fullName.firstName} ${fullName.lastName}`;
       setUsersName(formattedName);
     } catch (error) {
       console.error(`Error fetching users' data: `, error);
     }
   };

  const fetchProducts= async(prodId) => {
    try {
  const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/getById/${prodId}`
        );
      const productSingle = response.data.data;
      setProduct((prev) => [...prev, productSingle]);
         
          // setProduct([productSingle]);
      console.log("product", product)
      const categoryID = productSingle.categoryID;

        console.log("productSingle:", productSingle);
      console.log("categoryID:", categoryID);
      fetchCategoryName(categoryID);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
  };
   const fetchCategoryName = async (ID) => {
     console.log("IDCate", ID);
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_API_URL}/category/getById/${ID}`
       );

       const categorySingle = response.data.data;
       setCategory(categorySingle.name);
       console.log("categoryState", categorySingle);
      
     } catch (error) {
       console.error(`Error fetching category data: `, error);
     }
   };

  
    const fetchAllProducts =async () => {
      try {
      const productPromises = products.map((prodId) => fetchProducts(prodId));
    await Promise.all(productPromises);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
useEffect(() => {
  fetchAllProducts();
  fetchUserName(userId);
}, []);

  return (
    <div>
      <p className="text-red-700 text-3xl text-center underline my-5">
        EDIT ORDER
      </p>
      <div className="text-center">
        <form className="py-4" onSubmit={onHandleSubmit}>
          <div className="flex mb-4">
            <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left capitalize">
              {userName}
            </p>
            <span className="mx-4"></span>
            <div className="flex mb-4">
              <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                 {new Date(orderTime).toLocaleDateString("en-GB")}
              </p>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
              >
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Thumbnail</th>
                    <th className="px-4 py-2 text-left">Price </th>
                    <th className="px-4 py-2 text-left">Discounted</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("inside", product)}
                  {product.map((element) => (
                    <tr className="border-b" key={element._id}>
                      <td className="px-4 py-2 align-middle capitalize">
                        {category}
                      </td>
                      <td className="px-4 py-2 align-middle capitalize">
                        {element.name}
                      </td>
                      <td className="px-4 py-2 align-middle">
                        <img alt="product" src={element.images[0]} />
                      </td>
                      <td className="px-4 py-2 align-middle">
                        {element.price}
                      </td>
                      <td className="px-4 py-2 align-middle">
                        {element.discountPercentage !== 0
                          ? `${element.discountPercentage}%`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex mb-4">
            <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
              {totalPrice}
            </p>
            <span className="mx-4"></span>
            <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
              {shippingMethod}
            </p>
          </div>

          {setErrorMessage !== "" && (
            <p className="text-red-700 text-sm">{errorMessage}</p>
          )}
          <div className="flex justify-end">
            <button className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOrder;
