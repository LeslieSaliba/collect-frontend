import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import ViewCustomer from './DashModals/ViewCustomer';

function CustomersSection() {
    const [customers, setCustomers] = useState([]);
    const [ordersPerUser, setOrdersPerUser] = useState([]);
    const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
    const [selectedCustomerID, setSelectedCustomerID] = useState(null);
    const [customerData, setCustomerData] = useState(null);

    const fetchCustomers = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
            .then((response) => {
                setCustomers(response.data.data);
                response.data.data.forEach((user) => {
                    countOrderPerCustomer(user._id);
                });
            })
            .catch((error) => {
                console.error(`Error fetching customers' data: `, error);
            });
    }

    useEffect(() => {
        fetchCustomers();
        // getUserInfoByID()
    }, []);

    const countOrderPerCustomer = async (userID) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/getOrdersByUser/${userID}`);
            setOrdersPerUser(prevOrdersPerUser => ({
                ...prevOrdersPerUser,
                [userID]: response.data.data.length
            }));
        } catch (error) {
            console.error(`Error fetching orders' data: `, error);
        }
    };

    // const getUserInfoByID = async (userID) => {
    //     console.log('Customer ID to be check:', userID);
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getById/${userID}`);
    //         console.log('Response after get request:', response);
    //         console.log('Customer data retrieved successfully');
    //         setCustomerData(response.data.data)
    //     } catch (error) {
    //         console.error('Error retrieving customer data: ', error);
    //         console.log('Error response:', error.response);
    //     }
    // };

    const openViewCustomerModal = (userID) => {
        setSelectedCustomerID(userID);
        setShowViewCustomerModal(true);
    };

    const closeViewCustomerModal = () => {
        setShowViewCustomerModal(false);
    };

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Name &#8597;</th>
                            <th className="px-4 py-2 text-left">Email &#8597;</th>
                            <th className="px-4 py-2 text-left">Number of orders &#8597;</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers
                            .filter((customer) => customer.role === 'client')
                            .map((customer) => (
                                <tr key={customer._id} className='border-b'>
                                    <td className="px-4 py-2 capitalize">{`${customer.fullName.firstName} ${customer.fullName.lastName}`}</td>
                                    <td className="px-4 py-2">{customer.email}</td>
                                    <td className="px-4 py-2" >{ordersPerUser[customer._id] || 0}</td>
                                    <td className="px-4 py-2 italic text-red-700"
                                        onClick={() => openViewCustomerModal(customer._id)}>
                                        view details</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {showViewCustomerModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeViewCustomerModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <ViewCustomer userID={selectedCustomerID} />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default CustomersSection;