import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import AddCategory from "./DashModals/AddCategory";
import DeleteCategory from "./DashModals/DeleteCategory";
import EditCategory from "./DashModals/EditCategory";

function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [highlightedCategories, setHighlightedCategories] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState(null);
    const token = localStorage.getItem('token');

    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
            .then((response) => {
                setCategories(response.data.data);
                response.data.data.forEach((category) => {
                    handleProductsInfo(category.name);
                    handleHighlight(category.name);
                });
            })
            .catch((error) => {
                console.error(`Error fetching categories' data: `, error);
            });
    }

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

    const handleHighlight = (category) => {
        const isHighlighted = highlightedCategories.includes(category);

        if (isHighlighted) {
            const updatedHighlightedCategories = highlightedCategories.filter((item) => item !== category);
            setHighlightedCategories(updatedHighlightedCategories);
        } else {
            if (highlightedCategories.length < 4) {
                setHighlightedCategories((prevHighlightedCategories) => [...prevHighlightedCategories, category]);
            } else {
                const updatedHighlightedCategories = [...highlightedCategories.slice(1), category];
                setHighlightedCategories(updatedHighlightedCategories);
            }
        }
    };

    // not working yet, to check with full update
    // const updateHighlight = async (ID) => {
    //     try {
    //         const response = await axios.put(`${process.env.REACT_APP_API_URL}/category/update//${ID}`);
    //         setHighlightedCategories(prevhighlightedCategories => ({
    //             ...prevhighlightedCategories,
    //             [ID]: response.data.data._id
    //         }));
    //     } catch (error) {
    //         console.error(`Error updating highlighted data: `, error);
    //     }
    // }

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

    const editCategory = async (categoryID) => {
        console.log('Cat ID to be deleted:', categoryID);
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/category/update/${categoryID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after update request:', response);
            console.log('Category updated successfully');
            await fetchCategories();
            closeEditCategoryModal();
        } catch (error) {
            console.error('Error updating category data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    };

    const openEditCategoryModal = (categoryID) => {
        setSelectedCategoryID(categoryID);
        setShowEditCategoryModal(true);
    };

    const closeEditCategoryModal = () => {
        setShowEditCategoryModal(false);
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
                                        checked={highlightedCategories.includes(category.name) && category.highlighted}
                                        onChange={() => {
                                            handleHighlight(category.name);
                                            // updateHighlight(category._id);
                                        }}
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
                            <EditCategory fetchCategories={fetchCategories} closeEditCategoryModal={closeEditCategoryModal} editCategory={editCategory} categoryID={selectedCategoryID} />
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

            </div>

        </div>
    );
}

export default CategoriesSection;
