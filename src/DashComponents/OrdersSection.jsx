import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import DeleteOrder from "./DashModals/DeleteOrder";
import EditOrder from "./DashModals/EditOrder";

function OrdersSection() {
    const [orders, setOrders] = useState([]);
    const [singleOrders, setSingleOrders] = useState({});
    const [usersName, setUsersName] = useState({});
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
    const [showEditOrderModal, setShowEditOrderModal] = useState(false);
    const [selectedOrderID, setSelectedOrderID] = useState(null);
    const token = localStorage.getItem('token');

    const fetchOrders = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/getAll`)
            .then((response) => {
                setOrders(response.data.data);
                const userIds = response.data.data.map(order => order.userId);
                userIds.forEach(userId => fetchUserName(userId));
            })
            .catch((error) => {
                console.error(`Error fetching orders' data: `, error);
            });
    }

    useEffect(() => {
        fetchOrders();
    }, []);
    const fetchOrdersById = (orderID) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/order/getById/${orderID}`)
        .then((response) => {
            setSingleOrders(response.data.data);
          
         
        })
        .catch((error) => {
          console.error(`Error fetching orders' data: `, error);
        });
    };

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchUserName = async (ID) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getById/${ID}`);
            const { fullName } = response.data.data;
            const formattedName = `${fullName.firstName} ${fullName.lastName}`;
            setUsersName(prevUsersName => ({
                ...prevUsersName,
                [ID]: formattedName
            }));
        } catch (error) {
            console.error(`Error fetching users' data: `, error);
        }
    }

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

    const deleteOrder = async (orderID) => {
        console.log('Order ID to be deleted:', orderID);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/order/delete/${orderID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after delete request:', response);
            console.log('Order deleted successfully');
            await fetchOrders();
            closeDeleteOrderModal();
        } catch (error) {
            console.error('Error deleting order data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    };

    const openDeleteOrderModal = (orderID) => {
        setSelectedOrderID(orderID);
        setShowDeleteOrderModal(true);
    };

    const closeDeleteOrderModal = () => {
        setShowDeleteOrderModal(false);
    };

   const editOrder = async (orderID, orderStatus) => {
     try {
       const response = await axios.put(
         `${process.env.REACT_APP_API_URL}/order/update/${orderID}`,
         { status: orderStatus  }, 
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       );
       console.log("Response after update request:", response);
       console.log("Order updated successfully");
       await fetchOrders();
       closeEditOrderModal();
     } catch (error) {
       if (error.response) {
         console.error("Server responded with an error:", error.response.data);
         console.error("Status code:", error.response.status);
         console.error("Headers:", error.response.headers);
       } else if (error.request) {
         console.error("No response received:", error.request);
       } else {
         console.error("Error setting up the request:", error.message);
       }
     }
   };


    const openEditOrderModal = (orderID) => {
        setSelectedOrderID(orderID);
        setShowEditOrderModal(true);
        fetchOrdersById(orderID)
    };

    const closeEditOrderModal = () => {
        setShowEditOrderModal(false);
    };

    return (
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 text-left"
                  onClick={() => toggleSort("userId")}
                >
                  Name &#8597;
                </th>
                <th
                  className="px-4 py-2 text-left"
                  onClick={() => toggleSort("createdAt")}
                >
                  Date &#8597;
                </th>
                <th
                  className="px-4 py-2 text-left"
                  onClick={() => toggleSort("productIds")}
                >
                  Qty &#8597;
                </th>
                <th
                  className="px-4 py-2 text-left"
                  onClick={() => toggleSort("totalPrice")}
                >
                  Total &#8597;
                </th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2 capitalize">
                    {usersName[order.userId]}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">
                    {order.productIds.length === 1
                      ? "1 product"
                      : `${order.productIds.length} products`}
                  </td>
                  <td className="px-4 py-2">{order.totalPrice} $</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2 flex">
                    <img
                      className="h-6 w-6"
                      src="../Images/dashboardIcons/edit.png"
                      alt="edit"
                      onClick={() => openEditOrderModal(order._id)}
                    />
                    <img
                      className="h-6 w-6"
                      src="../Images/dashboardIcons/delete.png"
                      alt="delete"
                      onClick={() => openDeleteOrderModal(order._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {console.log("singleOrders", singleOrders)}
          {showDeleteOrderModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="bg-white p-6 relative z-10">
                <button
                  onClick={closeDeleteOrderModal}
                  className="absolute top-0 right-0 m-4 px-2 py-1"
                >
                  X
                </button>
                <DeleteOrder
                  fetchOrders={fetchOrders}
                  closeDeleteOrderModal={closeDeleteOrderModal}
                  deleteOrder={deleteOrder}
                  orderID={selectedOrderID}
                />
              </div>
            </div>
          )}
          {showEditOrderModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="bg-white p-6 relative z-10">
                <button
                  onClick={closeEditOrderModal}
                  className="absolute top-0 right-0 m-4 px-2 py-1"
                >
                  X
                </button>
                <EditOrder
                  fetchSingleOrders={singleOrders}
                  closeEditOrderModal={closeEditOrderModal}
                  editOrder={editOrder}
                  orderTime={singleOrders.createdAt}
                  status={singleOrders.status}
                  userId={singleOrders.userId}
                  products={singleOrders.productIds}
                  totalPrice={singleOrders.totalPrice}
                  shippingMethod={singleOrders.shippingMethod}
                  orderID={selectedOrderID}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default OrdersSection;
