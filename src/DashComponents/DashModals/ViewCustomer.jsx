import { useState, useEffect } from 'react';
import axios from 'axios';

function ViewCustomer({ userID }) {
    // const [customerInfo, setCustomerInfo] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        fullName: { firstName: '', lastName: '' },
        email: '',
        phoneNumber: '',
        fullAddress: { floor: '', building: '', street: '', description: '' },
        city: ''
    });

    useEffect(() => {
        const getUserInfoByID = async (userID) => {
            console.log('Customer ID to be checked:', userID);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getById/${userID}`);
                console.log('Response after get request:', response);
                console.log('Customer data retrieved successfully');
                console.log(response.data.data);
                setCustomerInfo(response.data.data);
            } catch (error) {
                console.error('Error retrieving customer data: ', error);
                console.log('Error response:', error.response);
            }
        };

        getUserInfoByID(userID);
    }, [userID]);

    return (
        <div>
            <p className="text-red-700 text-3xl text-center underline my-5">CUSTOMER INFO</p>
            <div className="text-center">
                <div className="py-4">
                    <div className="flex mb-4">
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.fullName.firstName}
                        </p>
                        <span className="mx-4"></span>
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.fullName.lastName}
                        </p>
                    </div>
                    <div className="flex mb-4">
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.email}
                        </p>
                        <span className="mx-4"></span>
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.phoneNumber}
                        </p>
                    </div>
                    <div className="flex mb-4">
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.fullAddress.floor}
                        </p>
                        <span className="mx-4"></span>
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.fullAddress.building}
                        </p>
                    </div>
                    <div className="flex mb-4">
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.fullAddress.street}
                        </p>
                        <span className="mx-4"></span>
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.city}
                        </p>
                    </div>
                    <div className="flex mb-4">
                        <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
                            {customerInfo.fullAddress.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCustomer;
