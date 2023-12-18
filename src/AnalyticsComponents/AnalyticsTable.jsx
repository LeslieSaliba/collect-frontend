import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsTable = () => {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [averageOrderAmount, setAverageOrderAmount] = useState(0);

  const fetchOrders = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/order/getAll`)
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error(`Error fetching orders' data: `, error);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);
      const roundedTotal = Math.round(totalAmount);
      setTotalSales(roundedTotal);

      const numberOfOrders = orders.length;
      const averageAmount = Math.round(totalAmount / numberOfOrders);
      setAverageOrderAmount(averageAmount);
    }
  }, [orders]);

  return (
    <table className="border-collapse">
      <tbody>
        <tr>
          <td className="p-4 border-none text-lg italic">Total amount of sales</td>
          <td className="p-4 border-none text-xl">{totalSales} $</td>
        </tr>
        <tr>
          <td className="p-4 border-none text-lg italic">Total number of orders</td>
          <td className="p-4 border-none text-xl">{orders.length}</td>
        </tr>
        <tr>
          <td className="p-4 border-none text-lg italic">Average order amount</td>
          <td className="p-4 border-none text-xl">{averageOrderAmount} $</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AnalyticsTable;
