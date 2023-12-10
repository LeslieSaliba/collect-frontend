import React, { useState,useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ConfirmAddToCart from "../SingleProductComponents/ConfirmAddToCart";
import SingleProductData from "../SingleProductComponents/SingleProductData";
import SingleProductSlider from "../SingleProductComponents/SingleProductSlider";
import AddedToCartSuccess from "../SingleProductComponents/AddedToCartSuccess";
import AlreadyInCart from "../SingleProductComponents/AlreadyInCart";
import "../css/SingleProduct.css";

function SingleProduct({ProductID}) {
  console.log(ProductID)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessCartModal, setShowSuccessCartModal] = useState(false);
  const [showFailCartModal, setShowFailCartModal] = useState(false);
  const modalRef = useRef(null);
  const [categoryData, setCategoryData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [ModalMessage, setModalMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const cartId = localStorage.getItem('cartId');
  const role = localStorage.getItem('role');

  const navigate = useNavigate();


  const addToCart = async () => {

    if (!userId || role !== 'client') {
      navigate('/AuthForm');
      return;
    }
   
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/addProduct/${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productID: ProductID,
        }),
      });
      
      const data = await response.json();

      if (response.ok) {
        setShowSuccessCartModal(true);
      } else {
        setShowFailCartModal(true);
        setModalMessage(data.message);
        console.error("API Error:", data.message);
      }

    } catch (error) {
      setShowFailCartModal(true);
      console.error("API Error:", error.message);
    }
 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getByID/${ProductID}`);
        const productData = response.data.data;

        setProductData(productData);
        setImages(productData.images);

        const categoryResponse = await axios.get(`${process.env.REACT_APP_API_URL}/category/getById/${productData.categoryID}`);
        if (categoryResponse.data.success) {
          setCategoryData(categoryResponse.data.data);
        } else {
          console.error("Error fetching category data:", categoryResponse.data.message);
        }

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [ProductID]);

  
  return (
    <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 SingleProduct-cont gap-24 bg-white">
      <div>
        <div className="mr-11 italic mb-16 text-center">
          <p className="text-3xl">{categoryData ? `All products / ${categoryData.name}` : "Loading..."}</p>
        </div>

        <SingleProductSlider images={images} />
      </div>
      <div className="mt-24">
        <SingleProductData
        productData={productData}
        openModal={openModal}
         />
            {isModalOpen && (
          <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div
              ref={modalRef}
              className="absolute bg-white p-8 rounded shadow-md"
            >
              <ConfirmAddToCart
               onConfirm={addToCart}
               closeModal={closeModal} 
                />
            </div>
          </div>
        )}

       {showSuccessCartModal && (
          <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white p-8 rounded shadow-md">
              <AddedToCartSuccess closeModal={() => setShowSuccessCartModal(false)} />
            </div>
          </div>
        )}

        {showFailCartModal && (
          <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white p-8 rounded shadow-md">
              <AlreadyInCart closeModal={() => setShowFailCartModal(false)} 
               Message={ModalMessage}/>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default SingleProduct;
