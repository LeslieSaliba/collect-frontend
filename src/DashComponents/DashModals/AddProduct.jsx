import { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct(fetchProducts, closeAddProductModal) {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [status, setStatus] = useState('');
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || !category || description.trim() === '' || price.trim() === '' || reference.trim() === '' || !images) {
      setErrorMessage('All fields are required');
      return;
    }

    const newProduct = new FormData();
    newProduct.append('name', name);
    newProduct.append('category', category);
    newProduct.append('status', status);
    newProduct.append('description', description);
    newProduct.append('price', price);
    // newProduct.append('discountPercentage', discountPercentage || 0);
    for (let i = 0; i < images.length; i++) {
      newProduct.append('images', images[i]);
    }

    console.log(newProduct, 'new product')
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/add`, newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${token}`
        },
      });
      console.log('Product added:', response.data);
      setShowAddProductModal(false);
    } catch (error) {
      console.log(newProduct, 'new product111')
      console.error('Error adding product:', error);
    }
  };

  // const handleCheckboxChange = (e) => {
  //   setApplyDiscount(e.target.checked);
  //   if (!e.target.checked) {
  //     setDiscountPercentage('');
  //   }
  // };

  // const handleDiscountChange = (e) => {
  //   setDiscountPercentage(e.target.value);
  // };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;

    if (selectedImages.length + images.length > 6) {
      setErrorMessage('Maximum 6 images allowed per product');
      return;
    }

    setImages((prevImages) => {
      const newImages = [...prevImages];
      for (let i = 0; i < selectedImages.length; i++) {
        newImages.push(selectedImages[i]);
      }
      return newImages;
    });
    setErrorMessage('');
  };

  const renderImageInputs = () => {
    const inputs = [];
    const remainingSlots = 6 - images.length;
    console.log(remainingSlots, 'remains')

    for (let i = 0; i < remainingSlots; i++) {
      inputs.push(
        <input
          key={i}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="flex-1 px-4 py-1 focus:outline-none text-black"
        />
      );
    }
    return inputs;
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error(`Error fetching categories' data: `, error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <p className="text-red-700 text-3xl text-center underline my-5">ADD PRODUCT</p>
      <div className="text-center">
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
            <span className="mx-4"></span>
            <div className="flex mb-4">
              <select
                value={category}
                onChange={handleCategoryChange}
                className=" px-4 py-2 mr-4 bg-gray-100 focus:outline-none text-lg text-black"
              >
                <option value="">Select category</option>
                {allCategories.map((category) => (
                  <option key={category._id} value={category.name} className="capitalize" >
                    {category.name}
                  </option>
                ))};
              </select>
            </div>
            <div className="flex mb-4">
              <select
                value={status}
                onChange={handleStatusChange}
                className=" px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
              >
                <option value="">Status</option>
                <option value="available">Available</option>
                <option value="sold out">Sold out</option>
              </select>
            </div>
          </div>
          <div className="flex mb-4">
            <textarea
              rows={5}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black resize-none"
            />
            <span className="mx-4"></span>
            <div className='flex flex-col'>{renderImageInputs()}
            </div>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
            <span className="mx-4"></span>
            <input
              type="text"
              placeholder="Reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
          </div>
          <div className="flex mb-4">
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={applyDiscount}
                  // onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <p className="text-black">Apply discount</p>
              </div>
              {applyDiscount && (
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Discount percentage %"
                    value={discountPercentage}
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

export default AddProduct;