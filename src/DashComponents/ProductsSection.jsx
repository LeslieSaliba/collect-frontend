import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import AddProduct from "./DashModals/AddProduct";

function ProductsSection() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
            .then((response) => {
                setProducts(response.data.data);
                const categoryIds = response.data.data.map(product => product.categoryID);
                categoryIds.forEach(fetchCategoryName);
            })
            .catch((error) => {
                console.error(`Error fetching products' data: `, error);
            });
    }, []);

    const fetchCategoryName = async (ID) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getbyID/${ID}`);
            const { name } = response.data.data;
            setCategories(prevCategories => ({
                ...prevCategories,
                [ID]: name
            }));
        } catch (error) {
            console.error(`Error fetching categories' data: `, error);
        }
    }

    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...products].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setProducts(sortedData);
        setSortOrder(!sortOrder);
    };

    const openAddProductModal = () => {
        setShowAddProductModal(true);
    };

    const closeAddProductModal = () => {
        setShowAddProductModal(false);
    };

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("name")}>Name &#8597;</th>
                            <th className="px-4 py-2 text-left">Thumbnail</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("price")}>Price &#8597;</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("disocuntPercentage")}>Discounted &#8597;</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-b'>
                                <td className="px-4 py-2 align-middle capitalize">{categories[product.categoryID]}</td>
                                <td className="px-4 py-2 align-middle capitalize">{product.name}</td>
                                <td className="px-4 py-2 align-middle"><img src={product.images[0]} alt="product" /></td>
                                <td className="px-4 py-2 align-middle">{product.price}</td>
                                <td className="px-4 py-2 align-middle">{product.discountPercentage !== 0 ? `${product.discountPercentage}%` : '-'}</td>
                                <td className="px-4 py-2 align-middle">{product.status}</td>
                                <td className="px-4 py-2 flex">
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit" />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100"
                    onClick={openAddProductModal}>
                    ADD PRODUCT
                </button>
                {showAddProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeAddProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <AddProduct />
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default ProductsSection;
