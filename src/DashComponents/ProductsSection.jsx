import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboard.css";
import AddProduct from "./DashModals/AddProduct";
import DeleteProduct from "./DashModals/DeleteProduct";
import EditProduct from "./DashModals/EditProduct";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [filterShow, setFilterShow] = useState(false);
  const [showFilterItem, setShowFilterItem] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/getAll`)
      .then((response) => {
        setProducts(response.data.data);
        const categoryIds = response.data.data.map((product) => product.categoryID);
        categoryIds.forEach(fetchCategoryName);
      })
      .catch((error) => {
        console.error(`Error fetching products' data: `, error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCategoryName = async (ID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getbyID/${ID}`);
      const { name } = response.data.data;
      setCategories((prevCategories) => ({
        ...prevCategories,
        [ID]: name,
      }));
    } catch (error) {
      console.error(`Error fetching categories' data: `, error);
    }
  };

  console.log("products", products);
  console.log("categories", categories);

  const [sortOrder, setSortOrder] = useState(true);
  const toggleSort = (field) => {
    const sortedData = [...products].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder ? -1 : 1;
      if (a[field] > b[field]) return sortOrder ? 1 : -1;
      return 0;
    });
    setProducts(sortedData);
    setSortOrder(!sortOrder);
  };

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const openDeleteProductModal = (productID) => {
    setSelectedProductID(productID);
    setShowDeleteProductModal(true);
  };

  const closeDeleteProductModal = () => {
    setShowDeleteProductModal(false);
  };

  const editProduct = async (productID) => {
    console.log("Product ID to be deleted:", productID);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/product/update/${productID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response after update request:", response);
      console.log("Product updated successfully");
      await fetchProducts();
      closeEditProductModal();
    } catch (error) {
      console.error("Error updating product data: ", error);
      console.log("Error response:", error.response);
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
      }
    }
  };

  const openEditProductModal = (productID) => {
    setSelectedProductID(productID);
    setShowEditProductModal(true);
  };

  const closeEditProductModal = () => {
    setShowEditProductModal(false);
  };

  const sortOptions = [
    { name: "Available", href: "#", current: false },
    { name: "Sold Out", href: "#", current: false },
    { name: "Discounted", href: "#", current: false },
    { name: "Clear Filter", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const selectedChangeFilter = (value) => {
    console.log(value);
    setFilterShow(true);
    if (value === "Available") {
      const AvailableProduct = products.filter((product) => product.status === "available");
      setShowFilterItem([...AvailableProduct]);
    }
    if (value === "Sold Out") {
      const SoldProduct = products.filter((product) => product.status === "sold");
      setShowFilterItem([...SoldProduct]);
    }

    if (value === "Discounted") {
      const discountedProduct = products.filter((product) => product.discountPercentage !== 0);
      setShowFilterItem([...discountedProduct]);
    }
    if (value === "Clear Filter") {
      setFilterShow(false);
    }
  };

  const searchUser = (e) => {
    e.preventDefault();
    console.log("searchName", searchName);
    setShowSearch(true);

    const result = products
      .map((prod) => {
        const category = categories[prod.categoryID];
        const elementCtegories = (category && category.toLowerCase().trim()) || "";
        console.log("elementCtegories", elementCtegories);

        const elementProd = prod.name.toLowerCase().trim();
        console.log("elementProd", elementProd);

        const search = searchName.toLowerCase().trim();
        console.log("search", search);

        console.log("check", elementProd === search);
        return elementCtegories.includes(search) || elementProd.includes(search) ? prod : null;
      })
      .filter((item) => item !== null);

    console.log("res", result);
    setShowFilterItem([...result]);
  };

  return (
    <div>
      <form onSubmit={searchUser}>
        <div className="flex items-baseline justify-end pb-6 pt-1 ">
          <div
            className="flex items-baseline justify-end pb-6 bg-white rounded-lg "
            x-data="{ search: '' }"
            onClick={() => {
              setShowSearch(false);
              setShowFilterItem([...products]);
            }}
          >
            <div className="relative inline-block ">
              <input
                type="search"
                className="w-full px-4 py-1 text-gray-800  rounded-full focus:outline-none"
                placeholder="search"
                x-model="search"
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

          <div className="flex items-baseline justify-end  pb-6">
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
                                option.current ? "font-medium text-gray-900" : "text-gray-500",
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
      </form>
      {filterShow || showSearch ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th
                    className="px-4 py-2 text-left"
                    onClick={() => toggleSort("name")}
                  >
                    Name &#8597;
                  </th>
                  <th className="px-4 py-2 text-left">Thumbnail</th>
                  <th
                    className="px-4 py-2 text-left"
                    onClick={() => toggleSort("price")}
                  >
                    Price &#8597;
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    onClick={() => toggleSort("discountPercentage")}
                  >
                    Discounted &#8597;
                  </th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {showFilterItem.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="px-4 py-2 align-middle capitalize">
                      {categories[product.categoryID]}
                    </td>
                    <td className="px-4 py-2 align-middle capitalize">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 align-middle">
                      <img src={product.images[0]} alt="product" />
                    </td>
                    <td className="px-4 py-2 align-middle">{product.price}</td>
                    <td className="px-4 py-2 align-middle">
                      {product.discountPercentage !== 0
                        ? `${product.discountPercentage}%`
                        : "-"}
                    </td>
                    <td className="px-4 py-2 align-middle">{product.status}</td>
                    <td className="px-4 py-2 flex">
                      <img
                        className="h-6 w-6"
                        src="../Images/dashboardIcons/edit.png"
                        alt="edit"
                        onClick={() => openEditProductModal(product._id)}
                      />
                      <img
                        className="h-6 w-6"
                        src="../Images/dashboardIcons/delete.png"
                        alt="delete"
                        onClick={(e) => openDeleteProductModal(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showDeleteProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 relative z-10">
                  <button
                    onClick={closeDeleteProductModal}
                    className="absolute top-0 right-0 m-4 px-2 py-1"
                  >
                    X
                  </button>
                  <DeleteProduct
                    fetchProducts={fetchProducts}
                    closeDeleteProductModal={closeDeleteProductModal}
                    productID={selectedProductID}
                  />
                </div>
              </div>
            )}
            {showEditProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 relative z-10">
                  <button
                    onClick={closeEditProductModal}
                    className="absolute top-0 right-0 m-4 px-2 py-1"
                  >
                    X
                  </button>
                  <EditProduct
                    fetchProducts={fetchProducts}
                    closeEditProductModal={closeEditProductModal}
                    editProduct={editProduct}
                    productID={selectedProductID}
                  />
                </div>
              </div>
            )}

            <button
              className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100"
              onClick={openAddProductModal}
            >
              ADD PRODUCT
            </button>
            {showAddProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 relative z-10">
                  <button
                    onClick={closeAddProductModal}
                    className="absolute top-0 right-0 m-4 px-2 py-1"
                  >
                    X
                  </button>
                    <AddProduct
                      fetchProducts={fetchProducts}
                      closeAddProductModal={closeAddProductModal}
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
                    <th className="px-4 py-2 text-left">Category</th>
                    <th
                      className="px-4 py-2 text-left"
                      onClick={() => toggleSort("name")}
                    >
                      Name &#8597;
                    </th>
                    <th className="px-4 py-2 text-left">Thumbnail</th>
                    <th
                      className="px-4 py-2 text-left"
                      onClick={() => toggleSort("price")}
                    >
                      Price &#8597;
                    </th>
                    <th
                      className="px-4 py-2 text-left"
                      onClick={() => toggleSort("discountPercentage")}
                    >
                      Discounted &#8597;
                    </th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-b'>
                                <td className="px-4 py-2 align-middle capitalize">{categories[product.categoryID]}</td>
                                <td className="px-4 py-2 align-middle capitalize">{product.name}</td>
                                <td className="px-4 py-2 align-middle"><img src={product.images[0]} alt="product" /></td>
                                <td className="px-4 py-2 align-middle">{product.price}$</td>
                                <td className="px-4 py-2 align-middle">{product.discountPercentage !== 0 ? `${product.discountPercentage}%` : '-'}</td>
                                <td className="px-4 py-2 align-middle">{product.status}</td>
                                <td className="px-4 py-2 flex">
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit"
                                        onClick={() => openEditProductModal(product._id)} />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete"
                                        onClick={(e) => openDeleteProductModal(product._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showDeleteProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeDeleteProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <DeleteProduct fetchProducts={fetchProducts} closeDeleteProductModal={closeDeleteProductModal} productID={selectedProductID} />
                        </div>
                    </div>
                )}
                {showEditProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeEditProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <EditProduct fetchProducts={fetchProducts} closeEditProductModal={closeEditProductModal} productID={selectedProductID} />
                        </div>
                    </div>
                )}

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100"
                    onClick={openAddProductModal}>
                    ADD PRODUCT
                </button>
                {showAddProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeAddProductModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <AddProduct closeAddProductModal={closeAddProductModal} fetchProducts={fetchProducts} />
                        </div>
                    </div>
                )}

            </div>

        </div>
         )}
         </div>
    );
}

export default ProductsSection;
