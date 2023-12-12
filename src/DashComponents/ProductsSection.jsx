import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import AddProduct from "./DashModals/AddProduct";
import DeleteProduct from "./DashModals/DeleteProduct";
import EditProduct from "./DashModals/EditProduct";

function ProductsSection() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [selectedProductID, setSelectedProductID] = useState(null);
    const token = localStorage.getItem('token');

    const fetchProducts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
            .then((response) => {
                setProducts(response.data.data);
                const categoryIds = response.data.data.map(product => product.categoryID);
                categoryIds.forEach(fetchCategoryName);
            })
            .catch((error) => {
                console.error(`Error fetching products' data: `, error);
            });
    }

    useEffect(() => {
        fetchProducts();
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

    const deleteProduct = async (productID) => {
        console.log('Product ID to be deleted:', productID);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after delete request:', response);
            console.log('Product deleted successfully');
            await fetchProducts();
            closeDeleteProductModal();
        } catch (error) {
            console.error('Error deleting product data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    };

    const openDeleteProductModal = (productID) => {
        setSelectedProductID(productID);
        setShowDeleteProductModal(true);
    };

    const closeDeleteProductModal = () => {
        setShowDeleteProductModal(false);
    };

    const editProduct = async (productID) => {
        console.log('Product ID to be deleted:', productID);
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/product/update/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after update request:', response);
            console.log('Product updated successfully');
            await fetchProducts();
            closeEditProductModal();
        } catch (error) {
            console.error('Error updating product data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    };

    const openEditProductModal = (productID) => {
        setSelectedProductID(productID);
        setShowEditProductModal(true);
    };

    const closeEditProductModal = () => {
        setShowEditProductModal(false);
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
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("discountPercentage")}>Discounted &#8597;</th>
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
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit"
                                        onClick={() => openEditProductModal(product._id)} />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete"
                                        onClick={() => openDeleteProductModal(product._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showDeleteProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeDeleteProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <DeleteProduct fetchProducts={fetchProducts} closeDeleteProductModal={closeDeleteProductModal} deleteProduct={deleteProduct} productID={selectedProductID} />
                        </div>
                    </div>
                )}
                {showEditProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeEditProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <EditProduct fetchProducts={fetchProducts} closeEditProductModal={closeEditProductModal} editProduct={editProduct} productID={selectedProductID} />
                        </div>
                    </div>
                )}

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100"
                    onClick={openAddProductModal}>
                    ADD PRODUCT
                </button>
                {showAddProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeAddProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <AddProduct fetchProducts={fetchProducts} closeAddProductModal={closeAddProductModal} />
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default ProductsSection;
