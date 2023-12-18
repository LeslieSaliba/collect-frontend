import axios from 'axios';
import { useState } from 'react';

function DeleteProductImage({ closeDeleteProductImageModal, ImageIndex, ProductID }) {
    const [error, setError] = useState('');

  const handleConfirm = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/removeImage`,
        {
          productID: ProductID,
          imageIndex: ImageIndex,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        console.log('Image removed successfully:', data);
        closeDeleteProductImageModal();
      } else {
        console.error('Error removing image:', data);
        setError("you should at least have 3 images");
        
      }
    } catch (error) {
      console.error('Error removing image:', error.message);
      setError("you should at least have 3 images");
    }

    
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl m-12 w-2/3 mx-auto">
          Are you sure you want to delete this image?
        </p>

        {error && <p className="text-red-700">{error}</p>}
        <div className="flex justify-end bg-gray-100 p-6 items-center">
          <button
            className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block  mr-4"
            onClick={closeDeleteProductImageModal}
          >
            CANCEL
          </button>
          <button
            className="bg-red-700 text-white font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block"
            onClick={handleConfirm}
          >
            CONFIRM
          </button>
        </div>
    
      </div>
    </div>
  );
}

export default DeleteProductImage;