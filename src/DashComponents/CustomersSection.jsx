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
    const [searchName, setSearchName] = useState("")
    const[resultSearch,setResultSearch]=useState([])
    const [showSearch, setShowSearch] = useState(false);

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

    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...customers].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setCustomers(sortedData);
        setSortOrder(!sortOrder);
    };

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

    console.log("customers",customers)
  const searchUser = (e) => {
    e.preventDefault();
    setShowSearch(true);

    const result = customers
      .map((customer) => {
        const userFirstName = (
          (customer.fullName && customer.fullName.firstName) ||
          ""
        ).toLowerCase();
        const userLastName = (
          (customer.fullName && customer.fullName.lastName) ||
          ""
        ).toLowerCase();

        const searchFirstName = searchName.split(" ")[0];
        const searchLastName = searchName.split(" ")[1];

        return userFirstName.includes(searchFirstName) ||
          userFirstName.includes(searchLastName) ||
          userLastName.includes(searchFirstName) ||
          userLastName.includes(searchLastName)
          ? customer
          : null;
      })
      .filter((item) => item !== null);

    setResultSearch(result);
  };

    const openViewCustomerModal = (userID) => {
        setSelectedCustomerID(userID);
        setShowViewCustomerModal(true);
    };

    const closeViewCustomerModal = () => {
        setShowViewCustomerModal(false);
    };

    return (
        <div>
        <form onSubmit={searchUser}>
          <div className="flex items-baseline justify-end   pb-6 pt-1 ">
            <div
              className="flex items-baseline justify-end pb-6 pt-24  bg-white rounded-lg "
              x-data="{ search: '' }"
              onClick={() => setShowSearch(false)}
            >
              <div className="relative inline-block ">
                <input
                  type="search"
                  className="w-full px-4 py-1 text-gray-800  rounded-full focus:outline-none"
                  placeholder="search"
                  onChange={(e) => setSearchName(e.target.value.toLowerCase())}
                />
              </div>

              <button
                type="submit"
                className="flex mr-4  bg-gray-200 justify-center w-8 h-5 text-white rounded-r-lg"
                disabled={!searchName}
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
          </div>
        </form>
        {showSearch ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className="px-4 py-2 text-left"
                    onClick={() => toggleSort("xxx")}
                  >
                    Name &#8597;
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    onClick={() => toggleSort("email")}
                  >
                    Email &#8597;
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    onClick={() => toggleSort("xxx")}
                  >
                    Number of orders &#8597;
                  </th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {resultSearch
                  .filter((customer) => customer.role === "client")
                  .map((customer) => (
                    <tr key={customer._id} className="border-b">
                      <td className="px-4 py-2 capitalize">{`${customer.fullName.firstName} ${customer.fullName.lastName}`}</td>
                      <td className="px-4 py-2">{customer.email}</td>
                      <td className="px-4 py-2">
                        {ordersPerUser[customer._id] || 0}
                      </td>
                      <td
                        className="px-4 py-2 italic text-red-700"
                        onClick={() => openViewCustomerModal(customer._id)}
                      >
                        view details
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {showViewCustomerModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 relative z-10">
                  <button
                    onClick={closeViewCustomerModal}
                    className="absolute top-0 right-0 m-4 px-2 py-1"
                  >
                    X
                  </button>
                  <ViewCustomer userID={selectedCustomerID} />
                </div>
              </div>
            )}
          </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("xxx")}>Name &#8597;</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("email")}>Email &#8597;</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("xxx")}>Number of orders &#8597;</th>
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
                                    <td className="px-4 py-2 italic text-red-700 hover:underline"
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
        )}
      </div>
    );
}

export default CustomersSection;