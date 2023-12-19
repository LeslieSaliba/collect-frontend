import { useState } from 'react';
import axios from 'axios';
import CategoryDiscount from './CategoryDiscount';

function EditCategory({ fetchCategories, closeEditCategoryModal, categoryID, category, updateDiscountSuccess }) {
    const [name, setName] = useState(category.name || '');
    const [image, setImage] = useState(null);
    const [applyDiscount, setApplyDiscount] = useState(false);
    const [showCategoryDiscount, setShowCategoryDiscount] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e, categoryID) => {
        e.preventDefault();

        const updatedCategory = new FormData();

        updatedCategory.append('name', name);
        if (image) {
            updatedCategory.append('image', image);
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/category/update/${categoryID}`, updatedCategory, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Response after update request:', response);
            console.log('Category updated successfully');
            if (applyDiscount && !isNaN(discountPercentage) && discountPercentage >= 0) {
                const discountResponse = await axios.post(
                    `${process.env.REACT_APP_API_URL}/product/updateDiscountByCategoryID/${categoryID}`,
                    { discountPercentage: parseFloat(discountPercentage) },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                console.log('Discount updated successfully:', discountResponse);
                setShowCategoryDiscount(true);
                updateDiscountSuccess(true);
                console.log('Discount updated successfully:', showCategoryDiscount);
            }

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

    return (
        <div className="">
            <p className="text-red-700 text-3xl text-center underline my-5">EDIT CATEGORY</p>
            <div className="text-center">
                <form className="py-4" onSubmit={(e) => handleSubmit(e, categoryID)}>
                    <div className="flex mb-4">
                        <div className="flex-1 h-12">
                            <input
                                type="text"
                                placeholder="Category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black capitalize"
                            />
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="flex-1 px-4 py-2 focus:outline-none text-black"
                        />
                    </div>
                    <div className="flex mb-4">
                        <div>
                            <div className="flex items-center mb-2">
                            <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={applyDiscount}
                                    onChange={() => setApplyDiscount(!applyDiscount)}
                                />
                                <p className="text-black">Apply discount on all products of this category</p>
                            </div>
                            {applyDiscount && (
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        placeholder="Discount percentage %"
                                        value={Math.max(0,discountPercentage)}
                                        onChange={(e) => setDiscountPercentage(e.target.value)}
                                        className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {setErrorMessage !== '' && <p className="text-red-700 text-sm">{errorMessage}</p>}
                    <div className="flex justify-end">
                        <button
                            className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100">
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>

            {showCategoryDiscount && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={() => setShowCategoryDiscount(false)} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <CategoryDiscount closeModal={() => setShowCategoryDiscount(false)} />
                        </div>
                    </div>
                )}
        </div>
    );
}

export default EditCategory;
