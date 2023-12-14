import { useState } from 'react';
import axios from 'axios';

function EditBanner({ fetchBanners, closeEditBannerModal, bannerID, banner }) {
    const [error, setError] = useState('');
    const [text, setText] = useState(banner.text || '');
    const [textButton, setTextButton] = useState(banner.textButton || '');
    const [link, setLink] = useState(banner.link || '');
    const token = localStorage.getItem('token');

    const editBanner = async (bannerID, updatedFields) => {
        console.log('Banner ID to be deleted:', bannerID);

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/banner/update/${bannerID}`, updatedFields, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after update request:', response);
            console.log('Banner updated successfully');
            await fetchBanners();
            closeEditBannerModal();
        } catch (error) {
            console.error('Error updating category data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (textButton.length > 25) {
            setError('The button text must be a maximum of 25 characters');
            return;
        }

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(link)) {
            setError('Provide a link with valid URL format');
            return;
        }

        const updatedFields = {};

        if (text !== banner.text) {
            updatedFields.text = text;
        }

        if (textButton !== banner.textButton) {
            updatedFields.textButton = textButton;
        }

        if (link !== banner.link) {
            updatedFields.link = link;
        }

        try {
            await editBanner(bannerID, updatedFields);
            setError('');
            // closeEditBannerModal();
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    return (
        <div>
            <p className="text-red-700 text-3xl text-center underline my-5">EDIT BANNER</p>
            <div className="text-center">
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black w-full"
                        />
                    </div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Button text"
                            value={textButton}
                            onChange={(e) => setTextButton(e.target.value)}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black uppercase w-full"
                        />
                    </div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                        />
                    </div>

                    {error && <p className="text-red-700 text-sm">{error}</p>}
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

export default EditBanner;
