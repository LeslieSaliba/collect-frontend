import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import DeleteOrder from "./DashModals/DeleteOrder";
import EditOrder from "./DashModals/EditOrder";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [filterShow, setFilterShow] = useState(false);
  const [singleOrders, setSingleOrders] = useState({});
  const [usersName, setUsersName] = useState({});
  const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const token = localStorage.getItem('token');
  const [searchName, setSearchName] = useState("");
  const [showFilterItem, setShowFilterItem] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const searchUser = (e) => {
    e.preventDefault();
    console.log("searchName");
    setShowSearch(true);

    const result = orders
      .map((order) => {

        const userFirstName = usersName[order.userId].toLowerCase().split(" ")[0];
        const userLastName = usersName[order.userId].toLowerCase().split(" ")[1];

        const searchFirstName = searchName.split(" ")[0];
        const searchLastName = searchName.split(" ")[1];

        return userFirstName.includes(searchFirstName) ||
          userFirstName.includes(searchLastName) ||
          userLastName.includes(searchFirstName) ||
          userLastName.includes(searchLastName)
          ? order
          : null;
      })
      .filter((item) => item !== null);

    console.log("res", result);
    setShowFilterItem([...result])
  };

  // console.log("orders",orders)

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
  };

  const sortOptions = [
    { name: "Clear filter", href: "#", current: false },
    { name: "Pending", href: "#", current: false },
    { name: "Delivered", href: "#", current: false },
  ];

  useEffect(() => {
    setFilterShow(false);
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const selectedChangeFilter = (value) => {
    console.log(value);
    setFilterShow(true)
    if (value === "Clear filter") {
      setShowFilterItem([...orders]);
    }
    if (value === "Pending") {
      const pendingOrders = orders.filter(
        (order) => order.status === "pending"
      );
      setShowFilterItem([...pendingOrders]);
    }

    if (value === "Delivered") {
      const deliveredOrders = orders.filter(
        (order) => order.status === "delivered"
      );
      setShowFilterItem([...deliveredOrders]);
    }
  };

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
        { status: orderStatus },
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
      <div className="flex items-baseline justify-end   pb-6 pt-1 ">
        <form onSubmit={searchUser}>
          <div
            className="flex  justify-end pb-6 bg-white rounded-lg "
            x-data="{ search: '' }"
            onClick={() => {
              setShowSearch(false);
              setShowFilterItem([...orders]);
            }}
          >
            <div className="relative items-start ">
              <input
                type="search"
                className="border border-gray-200 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-500"
                placeholder="Search for customer"
                x-model="search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value.toLowerCase())}
              />
            </div>

            <button
              type="submit"
              className="flex bg-gray-200 h-full justify-center w-8 h-full text-white mr-4"
              disabled={!searchName}
              style={{ padding: '0.5rem' }}
            >
              <svg
                className="w-5 h-5 items-center"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>

        <div className="flex justify-end  pb-6">
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="border border-gray-200 px-4 py-2 group inline-flex justify-between text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort products by
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <li
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                            onClick={() => selectedChangeFilter(option.name)}
                          >
                            {option.name}
                          </li>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      {filterShow || showSearch ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className="px-4 py-2 text-left"
                  >
                    Name
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
                {showFilterItem.map((order) => (
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
      ) : (
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
      )}
    </div>
  );
}

export default OrdersSection;
