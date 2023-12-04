import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function OrdersSection() {
    const [orders, setOrders] = useState([]);

    //   useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API_URL}/orders/getAll`)
    //       .then((response) => {
    //         // setOrders(response.data.data);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching orders data:', error);
    //       });
    //   }, []);

    return (
        <div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">Date</th>
                            <th class="px-4 py-2 text-left">Qty</th>
                            <th class="px-4 py-2 text-left">Total</th>
                            <th class="px-4 py-2 text-left">Status</th>
                            <th class="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {orders.map((orders) => ( */}
                        {/* <tr key={orders._id}> */}
                        <tr>
                            <td class="px-4 py-2">Name</td>
                            <td class="px-4 py-2">Date</td>
                            <td class="px-4 py-2">Qty</td>
                            <td class="px-4 py-2">Total</td>
                            <td class="px-4 py-2">Status</td>
                            <td class="px-4 py-2 italic text-red-700">view details</td>
                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default OrdersSection;
