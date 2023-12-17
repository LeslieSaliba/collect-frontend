import React, { useState, useEffect } from "react";
import axios from 'axios';

function CartAddress({ closeModal, cartData }) {
  const token = localStorage.getItem('token');
  const fullAddress = cartData.user.fullAddress;
  const userID = cartData.user._id
  const [floor, setFloor] = useState('');
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');

  const editAddress = async (userID, newAddress) => {
    console.log('User ID to be updated:', userID);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userID}`, newAddress, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating team member address: ', error);
      if (error.response) {
        console.log(`Error while updating user's address`)
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    if (floor !== '' && floor !== fullAddress.floor) {
      updatedFields.floor = floor;
    } else {
      updatedFields.floor = fullAddress.floor;
    }

    if (city !== '' && city !== cartData.user.city) {
      updatedFields.city = city;
    } else {
      updatedFields.city = cartData.user.city;
    }

    if (building !== fullAddress.building) {
      updatedFields.building = building;
    } else {
      updatedFields.building = fullAddress.building;
    }

    if (description !== fullAddress.description) {
      updatedFields.description = description;
    } else {
      updatedFields.description = fullAddress.description;
    }

    if (street !== fullAddress.street) {
      updatedFields.street = street;
    } else {
      updatedFields.street = fullAddress.street;
    }

    // const user = {
    //   ...updatedFields,
    // };

    // console.log("Updated user object:", user);
    try {
      await editAddress(userID, updatedFields);
      closeModal();
      // fetchTeam();
    } catch (error) {
      // setError(error.response.data.error);
    }
  };

  return (
    <div className="  flex items-center justify-center">
      <div className="text-center ">
        <p className="text-right mb-8" onClick={closeModal}>X</p>
        <p className="text-3xl text-center  underline HomeArrival-title">
          EDIT ADDRESS
        </p>
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
            <input
              type="number"
              name="floor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              placeholder={fullAddress.floor}
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
            <span className="contactUsDescription-span"></span>
            <input
              type="text"
              name="building"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder={fullAddress.building}
              className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
          </div>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              name="city"
              value={cartData.user.city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
            <span className="contactUsDescription-span"></span>
            <input
              type="text"
              name="street"
              value={fullAddress.street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
          </div>
          <textarea
            className="w-full px-4 py-2 h-28 bg-gray-100 focus:outline-none  text-lg text-black"
            placeholder="Additional description"
            value={fullAddress.description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            required
          ></textarea>
          <button
            className="bg-white text-red-700 font-bold py-2 px-6 border border-red-700 text-lg inline-block mt-5 flex ml-auto justify-center"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartAddress;
