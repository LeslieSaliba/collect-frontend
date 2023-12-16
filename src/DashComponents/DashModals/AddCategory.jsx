import { useState } from 'react';
import axios from 'axios';

function AddCategory({ fetchCategories, closeAddCategoryModal }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '' || !image) {
            setErrorMessage('Fill in name and upload image for the new category');
            return;
        }

        const newCategory = new FormData();
        newCategory.append('name', name);
        newCategory.append('image', image);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/category/add`, newCategory, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Category added:', response.data);
            fetchCategories();
            closeAddCategoryModal();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="">
            <p className="text-red-700 text-3xl text-center underline my-5">ADD CATEGORY</p>
            <div className="text-center">
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <div className="flex-1 h-12">
                            <input
                                type="text"
                                placeholder="Category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
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

export default AddCategory;
