import { useState } from 'react';
import axios from 'axios';

function EditCategory({ fetchCategories, closeEditCategoryModal, categoryID, category }) {
    const [name, setName] = useState(category.name || '');
    const [image, setImage] = useState(null);
    const [applyDiscount, setApplyDiscount] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e, categoryID) => {
        e.preventDefault();
        console.log(categoryID, ' category ID');

        const updatedCategory = new FormData();

        updatedCategory.append('name', name);
        if (image) {
            updatedCategory.append('image', image);
        }

        console.log('Updated Category Data:', {
            name: name,
            image: image,
        });

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/category/update/${categoryID}`, updatedCategory, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                                    // checked={applyDiscount}
                                    // onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <p className="text-black">Apply discount on all products of this category</p>
                            </div>
                            {applyDiscount && (
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="Discount percentage %"
                                        // value={discountPercentage}
                                        // onChange={handleDiscountChange}
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
        </div>
    );
}

export default EditCategory;
