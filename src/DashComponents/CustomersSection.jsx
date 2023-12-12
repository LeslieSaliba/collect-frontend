import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function CustomersSection() {
    const [customers, setCustomers] = useState([]);
    const [ordersPerUser, setOrdersPerUser] = useState([]);

    useEffect(() => {
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
                                    <td className="px-4 py-2 italic text-red-700">view details</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default CustomersSection;
