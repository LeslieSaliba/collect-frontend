import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import AddCategory from "./DashModals/AddCategory";
import DeleteCategory from "./DashModals/DeleteCategory";
import EditCategory from "./DashModals/EditCategory";
import CantHighlight from './DashModals/CantHighlight';
import CategoryDiscount from "./DashModals/CategoryDiscount";

function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [showCantHighlight, setShowCantHighlight] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [highlightedCategories, setHighlightedCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [discountUpdated, setDiscountUpdated] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState(null);
    const token = localStorage.getItem('token');

    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
            .then((response) => {
                const categoriesData = response.data.data;
                const highlightedCategoriesData = categoriesData.reduce((acc, category) => {
                    acc[category._id] = category.highlighted;
                    return acc;
                }, {});
                setHighlightedCategories(highlightedCategoriesData);
                setCategories(categoriesData);
                categoriesData.forEach((category) => {
                    handleProductsInfo(category.name);
                });
            })
            .catch((error) => {
                console.error(`Error fetching categories' data: `, error);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);



    const handleProductsInfo = async (categoryName) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/categoryByName/${categoryName}`);
            setProductsInfo(prevproductInfo => ({
                ...prevproductInfo,
                [categoryName]: response.data.data
            }));
        } catch (error) {
            console.error(`Error fetching products' data: `, error);
        }
    }

    console.log("products", productsInfo)


    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...categories].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setCategories(sortedData);
        setSortOrder(!sortOrder);
    };

    const openAddCategoryModal = () => {
        setShowAddCategoryModal(true);
    };

    const closeAddCategoryModal = () => {
        setShowAddCategoryModal(false);
    };

    const deleteCategory = async (categoryID) => {
        console.log('Cat ID to be deleted:', categoryID);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/category/delete/${categoryID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after delete request:', response);
            console.log('token: ', `${process.env.TOKEN}`);
            console.log('Category deleted successfully');
            await fetchCategories();
            closeDeleteCategoryModal();
        } catch (error) {
            console.error('Error deleting category data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    };

    const openDeleteCategoryModal = (categoryID) => {
        setSelectedCategoryID(categoryID);
        setShowDeleteCategoryModal(true);
    };

    const closeDeleteCategoryModal = () => {
        setShowDeleteCategoryModal(false);
    };

    const openEditCategoryModal = (categoryID) => {
        const selected = categories.find(category => category._id === categoryID);
        setSelectedCategory(selected);
        setSelectedCategoryID(categoryID);
        setShowEditCategoryModal(true);
    };

    const closeEditCategoryModal = () => {
        setShowEditCategoryModal(false);
    };

    const handleCheckboxChange = async (categoryID) => {
        // Check if highlighting more than 4 categories
        const highlightedCount = Object.values(highlightedCategories).filter(value => value).length;

        if (highlightedCount >= 4 && !highlightedCategories[categoryID]) {
            setShowCantHighlight(true);
            return;
        }

        setHighlightedCategories((prevHighlightedCategories) => ({
            ...prevHighlightedCategories,
            [categoryID]: !prevHighlightedCategories[categoryID],
        }));

        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/category/update/${categoryID}`,
                {
                    highlighted: !highlightedCategories[categoryID],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            await fetchCategories();
        } catch (error) {
            console.error('Error updating highlighted status: ', error);
        }
    };
    const updateDiscountSuccess = (success) => {
        setDiscountUpdated(success);
    };

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("name")}>Category &#8597;</th>
                            <th className="px-4 py-2 text-left">Thumbnail</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("category")}>Qty &#8597;</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("discountPercentage")}>Discounted &#8597;</th>
                            <th className="px-4 py-2 text-left">Highlighted &#8597;</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id} className='border-b'>
                                <td className="px-4 py-2 capitalize">{category.name}</td>
                                <td className="px-4 py-2"><img src={category.image} alt="thumbnail" className="" /></td>
                                <td className="px-4 py-2">
                                    {productsInfo[category.name] ? (
                                        <span>
                                            {productsInfo[category.name].length}{" "}
                                            {productsInfo[category.name].length === 1 ? "product" : "products"}
                                        </span>
                                    ) : (
                                        "0 product"
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {productsInfo[category.name] && productsInfo[category.name].length > 0 ? (
                                        productsInfo[category.name].every(product => product.discountPercentage === productsInfo[category.name][0].discountPercentage) ? (
                                            `${productsInfo[category.name][0].discountPercentage}%`
                                        ) : (
                                            "-"
                                        )
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={highlightedCategories[category._id]}
                                        onChange={() => handleCheckboxChange(category._id)}

                                    />
                                </td>
                                <td className="px-4 py-2 flex">
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit"
                                        onClick={() => openEditCategoryModal(category._id)} />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete"
                                        onClick={() => openDeleteCategoryModal(category._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showDeleteCategoryModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeDeleteCategoryModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <DeleteCategory fetchCategories={fetchCategories} closeDeleteCategoryModal={closeDeleteCategoryModal} deleteCategory={deleteCategory} categoryID={selectedCategoryID} />
                        </div>
                    </div>
                )}
                {showEditCategoryModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeEditCategoryModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <EditCategory fetchCategories={fetchCategories} closeEditCategoryModal={closeEditCategoryModal} categoryID={selectedCategoryID} category={selectedCategory} updateDiscountSuccess={updateDiscountSuccess} />
                        </div>
                    </div>
                )}

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100"
                    onClick={openAddCategoryModal}>
                    ADD CATEGORY
                </button>
                {showAddCategoryModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeAddCategoryModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <AddCategory fetchCategories={fetchCategories} closeAddCategoryModal={closeAddCategoryModal} />
                        </div>
                    </div>
                )}

                {showCantHighlight && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={() => setShowCantHighlight(false)} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <CantHighlight closeModal={() => setShowCantHighlight(false)} />
                        </div>
                    </div>
                )}

                {discountUpdated && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={() => setDiscountUpdated(false)} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <CategoryDiscount closeModal={() => setDiscountUpdated(false)} />
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default CategoriesSection;
