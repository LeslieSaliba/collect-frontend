import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function OrdersSection() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/getAll`)
            .then((response) => {
                setOrders(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching orders' data: `, error);
            });
    }, []);

    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...orders].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setOrders(sortedData);
        setSortOrder(!sortOrder);
    };

    return (
        <div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("userId")}>Name &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("createdAt")}>Date &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("productIds")}>Qty &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("totalPrice")}>Total &#8597;</th>
                            <th class="px-4 py-2 text-left">Status</th>
                            <th class="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td class="px-4 py-2">{order.userId}</td>
                                <td class="px-4 py-2">{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                                <td class="px-4 py-2">{order.productIds.length} products</td>
                                <td class="px-4 py-2">{order.totalPrice}</td>
                                <td class="px-4 py-2">{order.status}</td>
                                <td class="px-4 py-2 italic text-red-700">view details</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default OrdersSection;
