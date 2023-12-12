import { useState } from 'react';
import axios from 'axios';

function EditCategory({ fetchCategories, closeEditCategoryModal, editCategory, categoryID }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [applyDiscount, setApplyDiscount] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '' || !image) {
            setErrorMessage('Fill in name and upload image to edit category');
            return;
        }

        const newCategory = new FormData();
        newCategory.append('name', name);
        newCategory.append('image', image);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/category/add`, newCategory, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzcwODQ5MTkyMzFjYWE2NDQ0YTFlMyIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE3MDIzMTA4NDYsImV4cCI6MTcwMjMxNDQ0Nn0.y248-zKsprfalb_d4amr_R8RLoVSBHyHf-JHlB_9pDw`,
                },
            });
            console.log('Category edited:', response.data);
            fetchCategories();
            closeEditCategoryModal();
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    // const handleCheckboxChange = (e) => {
    //     setApplyDiscount(e.target.checked);
    //     if (!e.target.checked) {
    //         setDiscountPercentage('');
    //     }
    // };

    // const handleDiscountChange = (e) => {
    //     setDiscountPercentage(e.target.value);
    // };

    return (
        <div className="">
            <p className="text-red-700 text-3xl text-center underline my-5">EDIT CATEGORY</p>
            <div className="text-center">
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <div className="flex-1 h-12">
                            <input
                                type="text"
                                placeholder="Category name"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                            />
                        </div>
                        <span className="mx-4"></span>
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
                    <div className="flex mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setImage(e.target.files[0])}
                            className="flex-1 px-4 py-2 focus:outline-none text-black"
                        />
                        <span className="mx-4"></span>
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
