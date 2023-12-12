import { useState, useEffect } from 'react';
import axios from 'axios';

function EditOrder() {
    const [showEditProductModal, setShowEditProductModal] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // code here 
    };

    useEffect(() => {
        // axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
        //     .then((response) => {
        //         setAllCategories(response.data.data);
        //     })
        //     .catch((error) => {
        //         console.error(`Error fetching categories' data: `, error);
        //     });
    }, []);

    return (
        <div>
            <p className="text-red-700 text-3xl text-center underline my-5">EDIT ORDER</p>
            <div className="text-center">
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {/* {order.fullName} */}
                        </p>
                        <span className="mx-4"></span>
                        <div className="flex mb-4">
                            <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                                {/* {order.date} */}
                            </p>
                            <select
                                // value={status}
                                // onChange={(e) => setStatus(e.target.value)}
                                className=" px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
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
                                    {/* {products.map((product) => (
                                            <tr key={product._id} className='border-b'> */}
                                    <tr className='border-b'>
                                        <td className="px-4 py-2 align-middle capitalize">
                                            {/* {categories[product.categoryID]} */}
                                        </td>
                                        <td className="px-4 py-2 align-middle capitalize">
                                            {/* {product.name} */}
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            {/* <img src={product.images[0]} alt="product" /> */}
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            {/* {product.price} */}
                                        </td>
                                        <td className="px-4 py-2 align-middle">
                                            {/* {product.discountPercentage !== 0 ? `${product.discountPercentage}%` : '-'} */}
                                        </td>
                                    </tr>
                                    {/* ))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
         
            <div className="flex mb-4">
                <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                    {/* {order.totalPrice} */}
                </p>
                <span className="mx-4"></span>
                <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                    {/* {order.shipmentMethod} */}
                </p>
            </div>

            {setErrorMessage !== '' && <p className="text-red-700 text-sm">{errorMessage}</p>}
            <div className="flex justify-end">
                <button
                    className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100">
                    SUBMIT
                </button>
            </div>
        </form>
            </div >
        </div >
    );
}

export default EditOrder;
